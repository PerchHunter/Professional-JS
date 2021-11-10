const API_URL = 'http://127.0.0.1:3000/'
const date = new Date;

Vue.component('goods-item', {
    template: `<div class="goods-item">
        <h3>{{title}}</h3>
        <p>{{price}} $</p>
        <button class="btn_add_card" v-on:click='addToCart'>Добавить в корзину</button>
    </div>`,
    data: () => {
        return {
            numberInOrder: Number,
            action: String,
            timeAction: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    },
    props: {
        title: String,
        price: Number
    },
    methods: {
        addToCart() {
            fetch(`${API_URL}addToCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({ product_name: this.title, price: this.price })
            })

            fetch(`${API_URL}stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({ numberInOrder: this.numberInOrder, action: `Добавлено в корзину: "${this.title}"`, timeAction: this.timeAction })
            })
        }
    }
})


Vue.component('goods-list', {
    template: `<div class="goods-list">
        <template v-if='list.length > 0'>
            <goods-item
                v-for='product of list'
                v-bind:key='product.id_product'
                v-bind:title='product.product_name'
                v-bind:price='product.price'
            ></goods-item>
        </template>
        <template v-else>
            <p class="goods_notification">Товаров с таким совпадением не найдено</p>
        </template>
    </div>`,
    props: {
        list: Array
    }
})

Vue.component('cart-item', {
    template: `<div class="cart-item">
        <h3>{{title}}</h3>
        <p>{{price}} $</p>
        <button class="btn_delete_cart" v-on:click='deleteFromCart'>Удалить из
            корзины</button>
    </div>`,
    data: () => {
        return {
            numberInOrder: Number,
            action: String,
            timeAction: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        }
    },
    props: {
        title: String,
        price: Number,
        id: Number
    },
    methods: {
        deleteFromCart() {
            fetch(`${API_URL}deleteFromBasket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({ id: this.id })
            })

            fetch(`${API_URL}stats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/JSON'
                },
                body: JSON.stringify({ numberInOrder: this.numberInOrder, action: `Удалено из корзины: "${this.title}"`, timeAction: this.timeAction })
            })
        }
    }
})

Vue.component('cart-list', {
    template: `<div class="cart_list" v-on:mouseleave='showCart'>
        <template v-if='cartlist.length > 0'>
            <cart-item
                v-for='product of cartlist'
                v-bind:key='product.id_product'
                v-bind:title='product.product_name'
                v-bind:price='product.price'
                v-bind:id='product.id_product'
            ></cart-item>
            <div class="sum_price_cart">Общая стоимость: {{this.sumprice}} $</div>
        </template>

        <template v-else>
            <p class="cart_notification">Ваша корзина пуста</p>
        </template>
    </div>`,
    props: {
        sumprice: Number,
        cartlist: Array,
        isvisiblecart: Boolean
    },
    methods: {
        showCart() {
            this.$emit('show-cart', this.isvisiblecart);
        },

    }
})

Vue.component('search', {
    template: `<form action="#" method="get">
        <input class="header_search" placeholder="Искать здесь..." type="text" v-model='searchLine'>
        <button type="submit" class="button_search" v-on:click="onClick">Поиск</button>
    </form>`,
    data: () => {
        return {
            searchLine: ''
        }
    },
    methods: {
        onClick() {
            this.$emit('search', this.searchLine);
        }
    }
})

const vm = new Vue({
    el: '#app',
    data: {
        goodsList: [],
        filteredGoods: [],
        isVisibleCart: false,
        cartList: [],
        sumPrice: Number,
        actionOfUser: []
    },

    methods: {
        filterGoods(searchLine) {
            const search = new RegExp(searchLine.trim(), 'i');

            if (search.length === 0) {
                this.filteredGoods = [...this.goodsList];
                return;
            }

            this.filteredGoods = this.goodsList.filter((good) => search.test(good.product_name));
        },

        showCart() {
            if (this.isVisibleCart) {
                this.isVisibleCart = false;
                return;
            }
            this.isVisibleCart = true;
        },

        cartSumPrice() {
            this.sumPrice = 0;

            for (let item of this.cartList) {
                this.sumPrice += item.price;
            }

            return this.sumPrice;
        },

        loadGoods() {
            fetch(`${API_URL}catalogData`)
                .then((response) => {
                    return response.json();
                })
                .then((request) => {
                    this.goodsList = request;
                    this.filteredGoods = request;
                })
        },

        loadCart() {
            fetch(`${API_URL}getBasket`)
                .then((response) => {
                    return response.json();
                })
                .then((goods) => {
                    this.cartList = goods;
                    this.cartSumPrice(goods);
                })
        }
    },

    mounted() {
        this.loadGoods();
        this.loadCart();
    },

    beforeUpdate() {
        this.loadCart();
    }
})
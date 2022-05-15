const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

const vm = new Vue({
    el: '#app',
    data: {
        goodsList: [],
        filteredGoods: [],
        cartList: [],
        searchLine: '',
        isVisibleCart: false,
        sumPrice: 0
    },

    methods: {
        filterGoods() {
            const search = new RegExp(this.searchLine.trim(), 'gi');

            if (search.length === 0) {
                this.filteredGoods = this.goodsList;
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
            fetch(`${API_URL}catalogData.json`)
                .then((response) => {
                    return response.json();
                })
                .then((request) => {
                    this.goodsList = request;
                    this.filteredGoods = request;
                })
                .catch((err) => {
                    console.log(err.text);
                })
        },

        loadCart() {
            fetch(`${API_URL}getBasket.json`)
                .then((response) => {
                    return response.json();
                })
                .then((goods) => {
                    this.cartList = goods.contents;
                    this.cartSumPrice();
                })
        },

        addToCart(product) {
            fetch(`${API_URL}addToBasket.json`)
                .then((response) => {
                    console.log(response);
                    this.cartList.push(product);
                    this.sumPrice += product.price;
                })
        },

        deleteToCart(cartProduct) {
            fetch(`${API_URL}deleteFromBasket.json`)
                .then((response) => {
                    const index = this.cartList.findIndex((good) => good.id_product == cartProduct.id_product);
                    this.cartList.splice(index, 1);
                    this.sumPrice -= cartProduct.price;
                })
        }
    },

    mounted() {
        this.loadGoods();
        this.loadCart();
    }
})
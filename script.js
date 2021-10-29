const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function send(onSuccess, onError, url, method = 'GET', data = null, headers = [], timeout = 60000) {
    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.open(method, url, true);


    headers.forEach((header) => {
        xhr.setRequestHeader(header.key, header.value);
    })


    xhr.timeout = timeout;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            if (xhr.status >= 400) {
                onError(xhr.statusText);
            } else {
                onSuccess(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}



class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }


    renderGoodsItem() {
        return `<div class="goods-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="btn_add_cart">Добавить в корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filtred = [];
    }

    filterSearch(searchString) { //передаём строку поиска
        searchString = searchString.trim(); //trim удаляет из начала и конца строки лишние пробелы
        const homePage = /index\.html/;
        const cartPage = /cart\.html/;

        if (homePage.test(window.location.href)) {

            if (searchString.length === 0) {
                this.filtred = this.goods; //если строка поиска пустая, то обновляем массив фильтр
                this.renderGoodsList(); //заново отрисовываем товары
                return;
            }

            const reg = new RegExp(searchString, 'i'); //если строка поиска не равна 0, то в названиях товара ищем соответствие
            this.filtred = this.goods.filter((good) => reg.test(good.title));
            this.renderGoodsList();

        } else if (cartPage.test(window.location.href)) {
            basket.filterSearchCart(searchString);
        }
    }

    //403 Forbidden
    //пытался сделать чтобы товар добавлялся на страницу корзины, но что-то идёт не так

    /*_onClick() {
        const addProduct = new BasketItem(this.title, this.price, this.id);
        fetch(`${API_URL}addToBasket.json`, { method: 'POST', body: JSON.stringify(addProduct) }) //отправляем новый объект товара  на сервер
            .then(() => {
                basket.loadProductList(); //заново загружаем из сервера список товаров корзины
            })
            .catch((err) => {
                console.log(err.text);
            })
    }*/

    _onClick(e) {
        const id = e.target.parentNode.getAttribute('data-id'); //ищем у родителя кнопки атрибут 'data-id' и достаем из него значение
        fetch(`${API_URL}addToBasket.json`)
            .then(() => {
                const product = this.goods.find((item) => item.id == id); //по id ищем товар в массиве каталога товаров
                console.log(product);
                basket.addToCart(product); //и добавляем его в массив this._list
            })
    }

    fetchGoods() {
        fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = request.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
                this.filtred = this.goods;
                this.renderGoodsList();
            })
            .catch((err) => {
                console.log(err.text);
            })
    }

    renderGoodsList() {
        let listHTML = '';
        this.filtred.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHTML += goodItem.renderGoodsItem();
        });
        document.querySelector('.goods-list').innerHTML = listHTML;
        const $buttonGoods = document.querySelectorAll('.goods-item button'); //так же создаем массив кнопок

        for (let button of $buttonGoods) {
            button.addEventListener('click', this._onClick.bind(this));//пробегаем по нему и задаем обработчики на ДОБАВЛЕНИЕ товара
        }
    }
}

class BasketItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }

    renderBasketItem() {
        return `<div class="cart-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="btn_delete_cart">Удалить из корзины</button></div>`;
    }
}

class Basket {
    constructor() {
        this._list = [];
        this._filtredBasket = [];
        this._sumPrice = 0;
    }

    getSumPrice() {
        this._sumPrice = 0;
        for (let item of this._list) {
            this._sumPrice += item.price;
        }

        return `Общая стоимость: ${this._sumPrice}`
    }

    filterSearchCart(searchString) {

        if (searchString.length === 0) {
            this._filtredBasket = this._list;
            this.renderBasket(); //заново отрисовываем товары
            return;
        }

        const reg = new RegExp(searchString, 'i'); //если строка поиска не равна 0, то в названиях товара ищем соответствие
        this._filtredBasket = this._list.filter((good) => reg.test(good.title));
        this.renderBasket();
    }

    addToCart(product) {
        this._list.push(product);
        this.renderBasket();
    }

    _onClickDelete(e) {
        const id = e.target.parentNode.getAttribute('data-id'); //ищем у родительского элемента кнопки атрибут 'data-id' и достаем из него значение
        fetch(`${API_URL}deleteFromBasket.json`)
            .then((response) => {
                const index = basket._list.findIndex((good) => good.id == id); //по этому значению ищем элемент в корзине товаров, возвращаем его индекс
                basket._list.splice(index, 1); //...и удаляем из массива этот товар
                basket.renderBasket(); //обновляем корзину
            })
            .catch((err) => {
                console.log(err.text);
            })
    }

    renderBasket() {
        let listHTML = '';
        this._filtredBasket.forEach(good => {
            const goodItem = new BasketItem(good.title, good.price, good.id);
            listHTML += goodItem.renderBasketItem();
        });
        document.querySelector('.cart_list').innerHTML = listHTML; //ЭТА СТРОКА СОЗДАЕТ ОШИБКУ. Пытаюсь добавить товары на страницу корзины, но он ищет селектор на главной странице
        document.querySelector('.sum_price_cart').innerText = basket.getSumPrice();

        const $buttonCart = document.querySelectorAll('.cart-item button'); //создаём массив кнопок для удаления,которые находится внутри товара

        for (let button of $buttonCart) {
            button.addEventListener('click', this._onClickDelete.bind(this)); //...пробегаем по массиву и каждой кнопке задаем обработчик на удаление своего товара
        }
    }

    loadProductList() { //загружаем из сервера список товаров, которые в корзине
        fetch(`${API_URL}getBasket.json`) //запрос к серверу, возвращается промис
            .then((response) => {
                return response.json(); //переводим ответ из формата json в нормальный вид. Снова возвращается промис в виде норм объекта, не json
            })
            .then((goods) => {
                this._list = goods.contents.map(good => ({ title: good.product_name, price: good.price, id: good.id_product }));
                this._filtredBasket = this._list;
                this.renderBasket();
            })
    }
}



//ФОРМА ОБРАТНОЙ СВЯЗИ
class CallbackForm {
    constructor() {
        this.$form = document.querySelector('#form');
        this.$name = document.querySelector('#name');
        this.$phone = document.querySelector('#phone');
        this.$email = document.querySelector('#email');
        this.$error = document.querySelector('#error');
        this.$comment = document.querySelector('#comment');
        this.$validation = document.querySelector('#validation');
    }

    sendError(input, text) { //в случае ошибки...
        input.style.backgroundColor = 'rgb(219, 82, 82)'; //подкрашиваем рамку красным
        input.setAttribute('placeholder', text);
        // error.textContent = text //пишем текст об ошибке
    }

    clear() {
        const inputs = this.$form.querySelectorAll('callback_input');

        inputs.forEach((input) => {
            input.style.backgroundColor = 'rgb(82, 69, 133)';
        })
    }

    checkName() {
        const regexp = /^[a-zA-Zа-яА-Я]+$/;
        if (!regexp.test(this.$name.value.trim())) { //если текст не соответствует требованиям, то вызываем функцию ошибки
            callbackForm.sendError(this.$name, 'Имя может содержать только буквы.');
        }
    }

    checkPhone() {
        const regexp = /^\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;
        if (!regexp.test(this.$phone.value)) {
            callbackForm.sendError(this.$phone, 'Введите в формате +7(000)000-0000.');
        }
    }

    checkEmail() {
        const regexp = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
        if (!regexp.test(this.$email.value.trim())) {
            callbackForm.sendError(this.$email, 'Неверный формат адреса эл. почты.');
        }
    }
}


const list = new GoodsList();
const basket = new Basket();
const $search = document.querySelector('.header_search');
const callbackForm = new CallbackForm();

list.fetchGoods();
basket.loadProductList();

$search.addEventListener('input', (e) => { //событие на ввод текста в поле поиска
    list.filterSearch($search.value);
})

callbackForm.$form.addEventListener('submit', (e) => {
    callbackForm.clear(); //после отправки инфы очищаем все поля
    callbackForm.checkName() || e.preventDefault(); //если всё ОК, то выполянется checkName.
    callbackForm.checkPhone() || e.preventDefault();
    callbackForm.checkEmail() || e.preventDefault();
}); //на форму повесили событие submit


callbackForm.$validation.addEventListener('click', (e) => {
    const regExp1 = /\s'/gm;
    const regExp2 = /'\W/gm;
    const str = callbackForm.$form.querySelector('#comment').value;
    if (regExp1.test(str)) {
        callbackForm.$form.querySelector('#comment').value = str.replace(regExp1, ' "');
    } else if (regExp2.test(str)) {
        callbackForm.$form.querySelector('#comment').value = str.replace(regExp2, '" ');
    }
})



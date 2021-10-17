class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`; 
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    sumPriceProduct() {
        //решил поэкспериментировать и использовать метод перебора массива reduce
        let sumPrice = this.goods.reduce((sum, current) => sum + current.price, 0);
        console.log(`Стоимость всех товаров: ${sumPrice}`);
    }

    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHTML += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHTML;
    }
}

const list = new GoodsList();
list.fetchGoods();

// 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
list.sumPriceProduct();

list.render();









/*1. Добавьте пустые классы для корзины товаров и элемента корзины товаров.
 Продумайте, какие методы понадобятся для работы с этими сущностями.*/

 /*Думаю так: в конструкторе BasketList мы создаём пустой массив. Далее, у каждого товара в каталоге должна быть кнопка "Добавить в корзину".
 Этой кнопке мы задаём событие onclick, при её нажатии вызывается allProductBasket(), 
 в который в качестве параметра идёт готовый объект продукта со всеми своими свойствами.
 Там мы добавляем в массив поступающие товары.
 В классе BasketItem  думаю что нам не нужен конструктор, так как объект товара уже сформирован. Единственное, в BasketItem
 нужно сделать метод, который также формирует разметку товара на странице корзины.
 По ананлогии с кодом выше в BasketList нужен метод, объединяющий все разметки продуктов корзины.
 Еще понадобится метод подсчёта общей стоимости товаров корзины, и метод, с помощью которого мы можем 
 увеличить или уменьшить количество товара.
 */
class BasketItem {

    product() {
        return `<div class="basket-item"><h3>${this.title}</h3><p>${this.price}</p></div>`; 
    }
}


class BasketList {
    constructor() {
        productList = [];
    }

    allProductBasket(product) {
        //добавляем в массив поступивший товар
    }

    quantityProduct() {
        //метод, позволяющий увеличить или уменьшить количество конкретного товара
    }

    sumPriceBasketProduct() {
        //считаем общую стоимость товаров корзины
    }

    markup() {   // объединяем разметку всех товаров в одно целое
        let basketListHTML = '';
        this.productList.forEach(good => basketListHTML += good.product());

        document.querySelector('.basket-list').innerHTML = basketListHTML;
    }
}
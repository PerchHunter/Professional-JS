class Hamburger {
    constructor(size) {  //создали гамбургер
        switch (size) {
            case 'большой':
                this.size = size;
                this.calories = 40;
                this.price = 100;
                break;
            case 'маленький':
                this.size = size;
                this.calories = 20;
                this.price = 50;
                break;
            default:
                alert('Неверное значение размера гамбургера.');
        }

        this.stuffing = [];
        this.topping = [];
    }

    addStuffing(stuffingAdd) { //добавляем в него начинки
        //проверяем, есть ли у нас уже такая начинка, чтобы не добавить её повторно
        let stuff = this.stuffing.find(item => item == stuffingAdd); //если такой начинки ещё нет, то stuff == undefined

        if (stuff == undefined) //раз такой начинки нет, добавляем её
            switch (stuffingAdd) {
                case 'сыр':
                    this.stuffing.push('сыр');
                    this.calories += 20;
                    this.price += 10;
                    break;
                case 'салат':
                    this.stuffing.push('салат');
                    this.calories += 5;
                    this.price += 20;
                    break;
                case 'картофель':
                    this.stuffing.push('картофель');
                    this.calories += 10;
                    this.price += 15;
                    break;
                default:
                    alert('Такой начинки у нас нет (неверное значение).');
            } else {
            alert(`${stuffingAdd[0].toUpperCase() + stuffingAdd.slice(1)} уже есть в Вашем гамбургере.`); //уведомляем что такая начинка уже есть
        }
    }

    removeStuffing(stuffingDelete) {  //можно удалить начинку
        this.stuffing = this.stuffing.filter(stuffingItem => stuffingItem != stuffingDelete); //перезаписываем массив начинок. Новый массив уже не будет содержать эту начинку
        hamburger.deleteComponent(stuffingDelete);
    }

    addTopping(toppingAdd) { //добавляем доп. ингредиенты
        let topp = this.topping.find(item => item == toppingAdd); //аналогично методу addStuffing

        if (topp == undefined) {
            switch (toppingAdd) {
                case 'приправа':
                    this.topping.push('приправа');
                    this.price += 15;
                    break;
                case 'майонез':
                    this.topping.push('майонез');
                    this.calories += 5;
                    this.price += 20;
                    break;
                default:
                    alert('Такой добавки у нас нет (неверное значение).');
            }
        } else {
            alert(`${toppingAdd[0].toUpperCase() + toppingAdd.slice(1)} уже есть в Вашем гамбургере.`);
        }
    }

    removeTopping(toppingDelete) { //можно удалить доп. ингредиент
        this.topping = this.topping.filter(toppingItem => toppingItem != toppingDelete); //аналогично методу removeStuffing
        hamburger.deleteComponent(toppingDelete);
    }

    deleteComponent(component) { //сюда прописываем абсолютно все компоненты и при удалении какого-либо ссылаемся на этот метод
        switch (component) {
            case 'сыр':
                this.calories -= 20;
                this.price -= 10;
                break;
            case 'салат': ;
                this.calories -= 5;
                this.price -= 20;
                break;
            case 'картофель':
                this.calories -= 10;
                this.price -= 15;
                break;
            case 'приправа':
                this.price -= 15;
                break;
            case 'майонез':
                this.calories -= 5;
                this.price -= 20;
                break;
        }
    }

    getToppings() {
        alert(`Дополнительно в Вашем гамбургере: ${this.topping.join(', ')}.`);
    }

    getSize() {
        alert(`Вы заказываете ${this.size} гамбургер.`);
    }

    getStuffing() {
        alert(`Начинки в Вашем гамбургере: ${this.stuffing.join(', ')}.`);
    }

    calculatePrice() {
        alert(`Стоимость гамбургера: ${this.price} рублей.`);
    }

    calculateCalories() {
        alert(`Калорийность гамбургера: ${this.calories} ккал.`);
    }
}

const hamburger = new Hamburger('большой');

//вызовы для проверочки
hamburger.addStuffing('картофель');
hamburger.addStuffing('сыр');
hamburger.addStuffing('салат');
hamburger.addStuffing('яблоко');
hamburger.addStuffing('картофель');

hamburger.removeStuffing('салат');

hamburger.addTopping('приправа');
hamburger.addTopping('майонез');
hamburger.addTopping('приправа');
hamburger.addTopping('соль');

hamburger.removeTopping('приправа');

hamburger.getToppings();
hamburger.getSize();
hamburger.getStuffing();
hamburger.calculatePrice();
hamburger.calculateCalories();
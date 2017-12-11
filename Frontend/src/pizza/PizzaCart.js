/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require ("./Storage")
//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });


    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити
    Cart.splice(Cart.indexOf(cart_item), 1);
    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    var saved_cart = Storage.read("cart");
    if(saved_cart){
        Cart = saved_cart;
    }



    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    Storage.write("cart",Cart);

    //Очищаємо старі піци в кошику
    $cart.html("");
    var total_price = 0;
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var pizza = cart_item.pizza;
        var size =  cart_item.size;
        total_price += pizza[size].price*cart_item.quantity;
        var $node = $(html_code);

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".minus").click(function () {
            //Зменшуємо к-ть замовлених піц
            cart_item.quantity--;

            //Оновлюємо відображення
            updateCart();
            if (cart_item.quantity == 0) {
                //якщо к-ть = 0, видаляємо піцу з замовлення
                removeFromCart(cart_item);
            }        })
        $node.find(".remove").click(function () {
            removeFromCart(cart_item);
        })

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".sum-price-count").text(total_price);
}
function clearCart() {
     Cart = [];
     updateCart();
}



exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.clearCart = clearCart;
exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;
exports.updateCart = updateCart;
exports.PizzaSize = PizzaSize;
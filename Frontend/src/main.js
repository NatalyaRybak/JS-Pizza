/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();

    $(".clear-cart").click(function () {
        PizzaCart.clearCart();
    });

    // $(".create-order").click(function () {
    //     PizzaCart.createOrder(function (err,data) {
    //         if(err){
    //             alert("Can't create order"+err.toString());
    //         }else{
    //             alert("Order success"+JSON.stringify(data));
    //         }
    //
    //     })
    // });
    $(".btn-order").click(function(){

        //TODO: 
    });
    

});
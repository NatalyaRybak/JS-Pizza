var basil = require ("basil.js");
basil  = new basil();
//запам'ятовуємо що було в кошику,щоб якщо користувач закриє кошик,наступного разу було теж саме;
exports.write = function (key,value) {
    basil.set(key,value);
};

exports.read = function (key) {
    basil.get(key);
}
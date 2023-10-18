const fs = require("fs");

const cart = require("../data/cart.json");

// Adds items to cart
function addToCart(itemDetails, num) {
    let total = 0;
    itemDetails.takeFromInventory = num
    cart.push(itemDetails);
    saveCart();
    for (const item of cart) {
        total += item.priceInCents * item.takeFromInventory;
    }
    return (total/100).toFixed(2);
}



// Saves the purchases to purchases.json file for persistence
function saveCart() {
    const stringifiedCart = JSON.stringify(cart);
    fs.writeFileSync("./data/cart.json", stringifiedCart); 
}

module.exports = {
    addToCart
}
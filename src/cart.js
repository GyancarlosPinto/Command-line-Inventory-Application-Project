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

// Deletes entire cart
function deleteCart() {
    cart.length = 0;
    saveCart();
}

// Update One item from cart
function updateOneItem(params) {
    const result = cart.findIndex(item => item.id === id);
    if(cart[result]) {
        cart[result] = {
        ...cart[result],
        ...itemDetails
      };
      saveItem();
      return items[result];
    }
    return `Error: item with ID ${id} not found`;
}



// Saves the purchases to purchases.json file for persistence
function saveCart() {
    const stringifiedCart = JSON.stringify(cart);
    fs.writeFileSync("./data/cart.json", stringifiedCart); 
}

module.exports = {
    addToCart,
    deleteCart,
    updateOneItem
}
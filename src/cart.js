const fs = require("fs");

const cart = JSON.parse(fs.readFileSync("./data/cart.json"))
const { faker } = require("@faker-js/faker");

// Adds items to cart
function addToCart(itemDetails, num) {
    itemDetails.takeFromInventory = num
    cart.push(itemDetails);
    saveCart();
    return itemDetails;
}

// Gets price of item or all items from cart
function getPriceFromCart() {
    let total = 0;
    for (const item of cart) {
        total += item.priceInCents * item.takeFromInventory;
    }
    return `$${(total/100).toFixed(2)}`;
}

// Deletes entire cart
function deleteCart() {
    cart.length = 0;
    saveCart();
}

// Update One item from cart
function updateOneItem(itemDetails, id) {
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

// Prints the receipt of a cart
function printReceipt() {
    const purchaseId = faker.random.alphaNumeric(12);
    let total = 0;
    let lines = [
        `Thank you for shopping at Spooky Supplies!`,
        `-------------------------------------------`,
    ];
    for (const item of cart) {
        lines.push(`${item.itemName}: $${(item.priceInCents * item.takeFromInventory / 100).toFixed(2)}`);
    }
    let purchasePrice = getPriceFromCart();
    lines.push(`-------------------------------------------`);
    lines.push(`TOTAL: ${purchasePrice}`);
    lines.push(`RECEIPT ID: ${purchaseId}`);
    return lines.join(`\n`);
}


// Saves the purchases to purchases.json file for persistence
function saveCart() {
    const stringifiedCart = JSON.stringify(cart);
    fs.writeFileSync("./data/cart.json", stringifiedCart); 
}

module.exports = {
    addToCart,
    getPriceFromCart,
    deleteCart,
    updateOneItem,
    printReceipt
}
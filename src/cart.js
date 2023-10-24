const fs = require("fs");

const cart = JSON.parse(fs.readFileSync("./data/cart.json"))
const { faker } = require("@faker-js/faker");
const chalk = require("chalk");

// Adds items to cart
function addToCart(itemDetails, num) {
    // making a new key value itemDetails.takeFromInventory and having it equal to a number
    itemDetails.takeFromInventory = num
    // PUSH itemDetails into cart with new key value 
    cart.push(itemDetails);
    saveCart();
    // RETURN itemDatails obj in cart with new value 
    return itemDetails;
}

// Gets price of item or all items from cart
function getPriceFromCart() {
    // LET total equal 0
    let total = 0;
    // CONST item iterates through the cart arr
    for (const item of cart) {
        // increment priceInCents * takeFromInventory into total
        total += item.priceInCents * item.takeFromInventory;
    }
    // RETURN total converted into dollar value 
    return `$${(total / 100).toFixed(2)}`;
}

// Deletes entire cart
function deleteCart() {
    // if the cart length equals 0
    cart.length = 0;
    // save the empty/deleted cart
    saveCart();
}

// Update One item from cart
function updateOneItem(id, itemDetails) {
    // CONST result contains the item found at given index by item id
    const result = cart.findIndex(item => item.id === id);
    // IF result is an item obj in cart arr
    if (cart[result]) {
        // item details will reflect key values and updated key values
        cart[result] = {
            ...cart[result],
            ...itemDetails
        };
        saveCart();
        // RETURN updated item 
        return cart[result];
    }
    // RETURN error message if id is not found
    return `Error: item with ID not found`;
}

// Prints the receipt of a cart
function printReceipt() {
    // CONST VAR contains faker generated random alphaNumeric id 
    const purchaseId = faker.random.alphaNumeric(12);
    // LET VAR contains lines of receipt 
    let lines = [ 
        `Thank you for shopping at Spooky Supplies!`,
        `------------------------------------------------------------------------------------`,
    ];
    // CONST item iterates through cart ARR
    for (const item of cart) {
        // PUSH key values in obj while giving the accumulated price of each item
        lines.push(`${item.itemName}: $${(item.priceInCents * item.takeFromInventory / 100).toFixed(2)}`);
    }
    // LET VAR hold function to get price from cart items
    let purchasePrice = getPriceFromCart();
    lines.push(`------------------------------------------------------------------------------------`);
    lines.push(`TOTAL: ${purchasePrice}`);
    lines.push(`RECEIPT ID: ${purchaseId}`);
    lines.push(`------------------------------------------------------------------------------------`);
    lines.push(`Hope you have a Spooky Halloween!!!`);
    // RETURN using chalk to change color and JOIN with \n to break up lines in receipt
    return chalk.magenta.italic(lines.join(`\n`));
}


// Saves the item or items and their details to cart.json file for persistence
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
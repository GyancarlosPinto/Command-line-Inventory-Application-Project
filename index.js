const {
    getItemById,
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    saveItem
} = require("./src/spookysupplies")

const {
    addToCart,
    getPriceFromCart,
    deleteCart,
    updateOneItem,
    printReceipt
} = require("./src/cart")

function processInput() {
    // Gets an expected command from the command line
    const expectedCommand = process.argv[2];
    // Default error value in case action can't be found
    let result = "Error: Command not found";
    
    const item = {};
    // CONST supplyDetails at index 3 maps the key values and splits them with `:`
    const supplyDetails = (process.argv.slice(3).map((value) => value.split(`:`)));
    // CONST details iterates through the key values of supplyDetails
    for (const details of supplyDetails) {
        // Obj item at details[index 0] will equal command at details[index 1]
        item[details[0]] = details[1];
    }
    // IF input is create
    if (expectedCommand === "create") {
        // result is the creation of a new item
        result = createItem(item)
    }
    // ELSE IF input is get
    else if (expectedCommand === "get") {
        // IF given the item's id key value
        if (item.id) {
            // result is that items details
            result = getItemById(item.id);
        }
        else {
            // ELSE if CMD is just get return all items
            result = getAllItems();
        }
    }
    // ELSE IF input is update
    else if (expectedCommand === "update") {
        // updates item by providing id and key values you want to update
        result = updateItem(item.id, item)
    }
    // ELSE IF input is delete
    else if (expectedCommand === "delete") {
        // deletes item with provided id value
        result = deleteItem(item.id);
    }
     // ELSE IF input is addToCart
    else if (expectedCommand === "addToCart") {
        // CONST itemDetails containing the getItemById func w/ item.id param
        const itemDetails = getItemById(item.id);
        // IF inStock is greater than or equal to new key value takeFromInventory
        if (itemDetails.inStock >= item.takeFromInventory) {
            // add itemDetails obj plus new key value to cart
            result = addToCart(itemDetails, item.takeFromInventory);
        }
    }
     // ELSE IF input is getPriceFromCart
    else if (expectedCommand === "getPriceFromCart") {
        // gets total price of item/items in cart
        result = getPriceFromCart();
    }
    // ELSE IF input is deleteCart
    else if (expectedCommand === "deleteCart") {
        // deletes cart of all items
        result = deleteCart();
    }
    // ELSE IF input is updateOneItem
    else if (expectedCommand === "updateOneItem") {
        // updates item in cart by providing id and key values you want to update
        result = updateOneItem(item.id, item);
    }
    // ELSE IF input is printReceipt
    else if (expectedCommand === "printReceipt") {
        // prints out receipt of cart purchase
        result = printReceipt()
    }

    saveItem();
    console.log(result);
}



processInput();
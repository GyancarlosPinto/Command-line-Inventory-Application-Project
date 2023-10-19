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
    // printReceipt
} = require("./src/cart")

function processInput() {
    const expectedCommand = process.argv[2];
    console.log(expectedCommand);
    
    let result = "Error: Command not found";

    const item = {};
    const supplyDetails = (process.argv.slice(3).map((value) => value.split(`:`)));

    for (const details of supplyDetails) {
        item[details[0]] = details[1];
    }

    if (expectedCommand === "create") {
        result = createItem(item)
    }

    else if (expectedCommand === "get") {
        if (item.id) {
            result = getItemById(item.id);
        }
        else {
            result = getAllItems();
        }
    }

    else if (expectedCommand === "update") {
        result = updateItem(item.id, item)
    }

    else if (expectedCommand === "delete") {
        result = deleteItem(item.id);
    }

    else if (expectedCommand === "addToCart") {
        const itemDetails = getItemById(item.id);
        if (itemDetails.inStock >= item.takeFromInventory) {
            result = addToCart(itemDetails, item.takeFromInventory);
        }
    }

    else if (expectedCommand === "getPriceFromCart") {
        result = getPriceFromCart();
    }

    else if (expectedCommand === "deleteCart") {
        result = deleteCart();
    }

    else if (expectedCommand === "updateOneItem") {
        result = updateOneItem(item.id, item);
    }

    // else if (expectedCommand === "printReceipt") {
    //     const itemDetails = itemDetails.receiptID
    // }

    saveItem();
    console.log(result);
}



processInput();
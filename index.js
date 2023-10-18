const {
    getItemById,
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    saveItem
} = require("./src/spookysupplies")

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

    saveItem();
    console.log(result);
}



processInput();
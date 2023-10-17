const {
    getItemById,
    getAllPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
    savePurchase
} = require("./src/spookysupplies")

function processInput() {
    const expectedCommand = process.argv[2];
    console.log(expectedCommand);
    
    let result = "Error: Command not found";

    const item = {};
    const customerPurchase = (process.argv.slice(3).map((value) => value.split(`=`)));

    for (const details of customerPurchase) {
        item[details[0]] = details[1];
    }

    if (expectedCommand === "create") {
        result = createPurchase(item)
    }

    else if (expectedCommand === "get") {
        if (item.id) {
            result = getItemById(item.id);
        }
        else {
            result = getAllPurchases();
        }
    }

    else if (expectedCommand === "update") {
        result = updatePurchase(item.id, item)
    }

    else if (expectedCommand === "delete") {
        result = deletePurchase(item.id);
    }

    savePurchase();
    console.log(result);
}



processInput();
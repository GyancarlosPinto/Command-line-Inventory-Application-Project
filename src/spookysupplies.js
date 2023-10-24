const fs = require("fs");

const items = require("../data/spookysupplies.json");
const { faker } = require("@faker-js/faker");
const { nanoid } = require("nanoid");

// Get one item out at the provided Id
function getItemById(id) {
    // CONST result contains the item found at given index by item id
    const result = items.findIndex(item => item.id === id);
    // IF result is greater than or equal to 0 as to not go into negative values
    if (result >= 0) {
        // RETURN item obj with it's key value details
        return items[result]
    }
    // RETURN error message when id does not exist
    return `Error: No item with such ID exists!`;
}

// Get all items
function getAllItems() {
    // RETURN all items
    return items;
}

// Create an item with details
function createItem(itemDetails) {
    // Faker generates an integer for priceInCents with the min set at 100 and max 1000000. 
    itemDetails.priceInCents = faker.datatype.float({ min: 100, max: 1000000, precision: 1 })
    // Same as above only for the key value inStock and lower min/max threshold.
    itemDetails.inStock = faker.datatype.float({ min: 0, max: 250, precision: 1 })
    // Nanoid generates a six digit length id of integers 
    itemDetails.itemId = nanoid(6);
    // To show that this can be done without a npm package using Number, Math.random and .toFixed(). 
    itemDetails.rating = Number(Math.random().toFixed(2));
    // PUSH new item into inventory
    items.push(itemDetails);
    saveItem();
    // RETURN newly created item obj
    return itemDetails;
}


// Update an existing item with the details provided
function updateItem(id, itemDetails) {
    // CONST result contains the item found at given index by item id
    const result = items.findIndex(item => item.id === id);
    // IF result is an item obj in items arr
    if (items[result]) {
        // item details will reflect key values and updated key values
        items[result] = {
            ...items[result],
            ...itemDetails
        };
        saveItem();
        // RETURN updated item 
        return items[result];
    }
    // RETURN error message when id is not found
    return `Error: item with ID not found`;
}

// Delete an existing item
function deleteItem(id) {
    // CONST result contains the item found at given index by item id
    const result = items.findIndex(item => item.id === id);
    // IF result is an item obj in items arr
    if (items[result]) {
        // CONST deleted is the items obj without the deleted item
        const deleted = items.splice(result, 1);
        saveItem();
        // RETURN the items obj without deleted item
        return deleted;
    }
    // RETURN error message when id is not found
    return `Error: item with ID not found`;
}

// Saves the items to spookysupplies.json file for persistence
function saveItem() {
    const stringifiedItems = JSON.stringify(items);
    fs.writeFileSync("./data/spookysupplies.json", stringifiedItems);
}

module.exports = {
    getItemById,
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    saveItem
}
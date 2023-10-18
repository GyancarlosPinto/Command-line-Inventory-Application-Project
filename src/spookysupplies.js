const fs = require("fs");

const items = require("../data/spookysupplies.json");
const { faker } = require("@faker-js/faker");
const { nanoid } = require("nanoid");

// Get one item out at the provided Id
function getItemById(id) {
    const result = items.findIndex(item => item.id === id);
    if (result >= 0) {
        return items[result]
    }
    return `Error: No item with such ID exists!`;
}

// Get all purchases
function getAllItems() {
    return items;
}

// Create a purchase with details
function createItem(itemDetails) {
    itemDetails.priceInCents = faker.datatype.float({ min: 100, max: 1000000, precision: 1 })
    itemDetails.inStock = faker.datatype.float({ min: 0, max: 250, precision: 1 })
    itemDetails.itemId = nanoid(6);
    itemDetails.rating = Number(Math.random().toFixed(2));
    items.push(itemDetails);
    saveItem();
    return itemDetails;
}


// Update an existing purchase with the details provided
function updateItem(id, itemDetails) {
    const result = items.findIndex(item => item.id === id);
    if(items[result]) {
        items[result] = {
        ...items[result],
        ...itemDetails
      };
      saveItem();
      return items[result];
    }
    return `Error: item with ID ${id} not found`;
}

// Delete an existing purchase
function deleteItem(id) {
    const result = items.findIndex(item => item.id === id);
    if(items[result]) {
      const deleted = items.splice(result, 1);
      saveItem();
      return deleted;
    }
  
    return `Error: item with ID ${id} not found`;
}

// Saves the purchases to purchases.json file for persistence
function saveItem() {
    const stringifiedPurchases = JSON.stringify(items);
    fs.writeFileSync("./data/spookysupplies.json", stringifiedPurchases); 
}

module.exports = {
    getItemById,
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
    saveItem
}
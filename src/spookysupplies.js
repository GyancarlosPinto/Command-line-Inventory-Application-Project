const fs = require("fs");

const purchases = require("../data/spookysupplies.json");
const { faker } = require("@faker-js/faker");
const { nanoid } = require("nanoid");

// Get one item out at the provided Id
function getItemById(id) {
    const result = purchases.findIndex(purchase => purchase.id === id);
    if (result >= 0) {
        return purchases[result]
    }
    return `Error: No purchase with ID exists`;
}

// Get all purchases
function getAllPurchases() {
    return purchases;
}

// Create a purchase with details
function createPurchase(itemDetails) {
    itemDetails.priceInCents = faker.datatype.float({ min: 100, max: 1000000, precision: 1 })
    itemDetails.inStock = faker.datatype.float({ min: 0, max: 250, precision: 1 })
    itemDetails.itemId = nanoid(6);
    itemDetails.rating = Number(Math.random().toFixed(2));
    purchases.push(itemDetails);
    return itemDetails;
}

// Update an existing purchase with the details provided
function updatePurchase(id, purchaseDetails) {
    const result = purchases.findIndex(purchase => purchase.id === id);
    if(purchases[result]) {
        purchases[result] = {
        ...purchases[result],
        ...purchaseDetails
      };
      return purchases[result];
    }
  
    return `Error: purchase with ID ${id} not found`;
}

// Delete an existing purchase
function deletePurchase(id) {
    const result = purchases.findIndex(purchase => purchase.id === id);
    if(purchases[result]) {
      const deleted = purchases.splice(result, 1);
      return deleted;
    }
  
    return `Error: event with ID ${id} not found`;
  }

// Saves the purchases to purchases.json file for persistence
function savePurchase() {
    const stringifiedPurchases = JSON.stringify(purchases);
    fs.writeFileSync("./data/spookysupplies.json", stringifiedPurchases); 
}

module.exports = {
    getItemById,
    getAllPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
    savePurchase
}
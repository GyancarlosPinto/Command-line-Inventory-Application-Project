const itemsAPI = require("../src/spookysupplies");

const suppliesData = require("../data/spookysupplies.json");

describe("Items API", () => {
    describe("gets items()", () => {
        it("correctly gets all items in persistent data", () => {
          expect(itemsAPI.getAllItems()).toEqual(suppliesData)
        })
    })
    
      describe("gets item()", () => {
        it("correctly gets a single item from persistent data", () => {
          const expected = {
            "itemName": "Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set",
            "priceInCents": 607500,
            "inStock": 2,
            "id": 'Je8jE2',
            "rating": 4.34
            };
          const actual = itemsAPI.getItemById("Je8jE2")
          expect(actual).toEqual(expected);
        })
    
        it("correctly gives an error string back when an item cannot be found", () => {
          const expected = "Error: No item with such ID exists!"
          const actual = itemsAPI.getItemById("invalid");
    
          expect(actual).toEqual(expected);
        })
    })
})
const cartAPI = require("../src/cart");

const cartData = require("../data/cart.json");

describe("Cart API", () => {
    describe("returns same item as inputted into cart()", () => {
        it("correctly gets details of item in persistent data", () => {
          const value = {
            "itemName": "Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set",
            "priceInCents": 607500,
            "inStock": 2,
            "id": 'Je8jE2',
            "rating": 4.34
          }
          const expected = {...value, takeFromInventory:1}
          expect(cartAPI.addToCart(value, 1)).toEqual(expected)
        })
    })

});

jest.mock('fs')

const fs = require("../__mocks__/fs");
const cartAPI = require("../src/cart");

describe("Cart API", () => {
    describe("gets price of item or items in the cart()", () => {
        it("correctly gets total price of all items in cart.", () => {
          expect(cartAPI.getPriceFromCart()).toEqual("$12276.50")
        })
    })

    describe("returns same item as inputted into cart()", () => {
        it("correctly gets details of item in persistent data.", () => {
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

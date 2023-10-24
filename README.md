# Spooky Supplies Application

The ghouly season is upon us and for all who want to buy their Halloween Supplies your banshee's call has been answered with the Spooky Supplies App! With this application our staff at Spooky Supplies would be allowed to add in inventory of our stock into the online store. While our view and cart functions will allow our customers to view and purchase our products. 

![Jack-o-lantern](https://images.pexels.com/photos/619418/pexels-photo-619418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

## Getting Started
Here is how the code that is deployed by this app works. 

As this app is still in a beta testing phase; fake data was input in order to showcase the functions. Hence, in order to generate this data at random the following npm packages were installed.
1. `npm install @faker-js/faker --save-dev`
2. `npm install nanoid@3`

These will be used to generate numbers for the values `priceInCents`, `inStock` and `rating`. While, ids will be generated for the key values `id` and `purchaseId`.

Thus, any data outside of the `itemName` will be randomized and generated by the packages above.

In order to test out the functionality of the application download npm install --save-dev jest.
- `npm install --save-dev jest.`

Finally, to add a bit of flare to the `printReceipt` command line function later on in our testing an npm package for chalk was installed.
- `npm install chalk@4`

## Input Function

The following function is what allows the application to call upon a function within the command line along with the data required for that function to function properly in the command line giving us an output that we desire or an error message if we have given it data which cannot be found through the command line function. Below ot is explained how this function with it's mechanics allow us to us the application through the command line. 

```
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
    ...
    ...
    ...
}
```

## Applying functions into the Command Line 

### Functions within `Spookysupplies.js`

#### *`node index.js create:`*

Entering node index.js create into the command requires just the input of an item's name by following up `node index.js create` with the `itemName` key value. As the example below shows by entering `"Jack-O-Lantern Skeleton"`. [^1] 

```
// Input into command line
node index.js create temName:"Jack-O-Lantern Skeleton"

// Output
create 
    {
        itemName: "Jack-O-Lantern Skeleton",
        priceInCents: 2450,
        inStock: 28,
        id: "VqxyIk",
        rating: 4.23
    },
```
[^1]: It matters how you enter the string value into the command line as entering it without quotes `(" ")` will cause the function to believe you are entering other keys into the object. Thus, printing out the result incorrectly. 

**Functionality**

In index.js:
```
    // IF input is create
    if (expectedCommand === "create") {
        // result is the creation of a new item
        result = createItem(item)
    }
```

In spookysupplies.js:
```
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
```

#### *`node index.js get:`*

Entering node index.js get require the input to be written out as the example below, by using an item's id key value in this case: `id:VqxyIk` to pull the rest of the item's details. While just entering node index.js get will return all of the items in `spookysupplies.json`.

`With item id: included`.
```
// Input into command line
node index.js get id:VqxyIk

// Output 
get
{
  itemName: 'Jack-O-Lantern Skeleton',
  priceInCents: 2450,
  inStock: 28,
  id: 'VqxyIk',
  rating: 4.23
}
```

`Without item id:`.
```
// Input into command line
node index.js get

// Output 
get
{
  itemName: 'Jack-O-Lantern Skeleton',
  priceInCents: 2450,
  inStock: 28,
  id: 'VqxyIk',
  rating: 4.23
}
{
        "itemName": "Plastic Spiders Bag",
        "priceInCents": 580,
        "inStock": 66,
        "id": "C8yS7k",
        "rating": 1.26
    },
    {
        "itemName": "Animatronic Monster",
        "priceInCents": 446800,
        "inStock": 4,
        "id": "5GGm3k",
        "rating": 4.63
    },
    {
        "itemName": "Dracula-Blood-Beer-Keg-Dispensary",
        "priceInCents": 390200,
        "inStock": 79,
        "id": "OsRKQx",
        "rating": 4.39
    },
    {
        "itemName": "Custom All Ghouls Eve T-Shirt",
        "priceInCents": 6925,
        "inStock": 66,
        "id": "uyN8gE",
        "rating": 3.04
    },
```

**Functionality**

In index.js:
```
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
```

In spookysupplies.js:
```
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
```

#### *`node index.js update:`*

Entering node index.js update into the command will necessitate the use of an item's `id` key values as with the example provided below we're updating with `Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set` it's id `id:Je8jE2` placing it after writing `node index.js update` into the command line. In the exampe the `inStock` and `rating` key values which are being updated with this function. Note that the returned key values are returned as string values as opposed to the integer values they replaced. 

```
// Input into command line
node index.js update id:Je8jE2
// Before update
{
  itemName: "Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set",
  priceInCents: 607500,
  inStock: 2,
  id: 'Je8jE2',
  rating: 4.34
}

//Output
// After update
{
  itemName: "Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set",
  priceInCents: 607500,
  inStock: '4',
  id: 'Je8jE2',
  rating: '4.64'
}
```
**Functionality**

In index.js:
```
    // ELSE IF input is update
    else if (expectedCommand === "update") {
        // updates item by providing id and key values you want to update
        result = updateItem(item.id, item)
    }
```

In spookysupplies.js:
```
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
```

#### *`node index.js delete`*

Entering node index.js delete into the command will delete the entirety of an item in the Spooky Suppplies inventory as a whole. In the example below use an item's id key value `itemId:'LC-8tZ'` in order to navigate to the item you wish to delete from the inventory. If you enter just `node index.js delete` with no item id then the command will delete the last item inputted into the inventory list. 

```
// Input into command line
node index.js delete itemId:'LC-8tZ'

// Output
  {
    itemName: 'Halloween Monster Mash Gummies',
    priceInCents: 972,
    inStock: 138,
    itemId: 'LC-8tZ',
    rating: 3.23
  }
```
**Functionality**

In index.js:
```
    // ELSE IF input is delete
    else if (expectedCommand === "delete") {
        // deletes item with provided id value
        result = deleteItem(item.id);
    }
```

In spookysupplies.js:
```
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
```

### Functions within `cart.js`

#### *`node index.js addToCart:`*

Entering node index.js addToCart into the command will add an item into the cart by pulling it's key value details via the item's id in this case `id:"Afb726"`. It ensures that the `spookysupplies` does have an adequate amount of stock to add into the cart however, by ensuring that a new key value `takeFromInventory` has a number value that is then compare to the `inStock` key value to see if it's integer value is greater than or equal to each other in order to allow the item to be pushed into the cart. 

```
// Input into command line
node index.js addToCart id:"Afb726"

// cart before adding to cart
[]

// Output
//cart after adding to cart
[
    {
        "itemName": "Bag of Brains",
        "priceInCents": 925,
        "inStock": 174,
        "id": "Afb726",
        "rating": 0.81,
        "takeFromInventory": "5"
    },
]
```
**Functionality**

In index.js:
```
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
```

In cart.js:
```
// Adds items to cart
function addToCart(itemDetails, num) {
    // making a new key value itemDetails.takeFromInventory and having it equal to a number
    itemDetails.takeFromInventory = num
    // PUSH itemDetails into cart with new key value 
    cart.push(itemDetails);
    saveCart();
    // RETURN itemDatails obj in cart with new value 
    return itemDetails;
}
```

#### *`node index.js getPriceFromCart:`*

Entering node index.js getPriceFromCart into the command will pull the total price of the item/items in the cart by multiplying the key values of `item.priceInCents` and  `item.takeFromInventory` then converting the `priceInCents` value to get the total price in dollars value in the console. 

```
// Input into command line
node index.js getPriceFromCart

// Output
// total price of items provided in cart.json
$12276.50
```
**Functionality**

In index.js:
```
     // ELSE IF input is getPriceFromCart
    else if (expectedCommand === "getPriceFromCart") {
        // gets total price of item/items in cart
        result = getPriceFromCart();
    }
```

In cart.js:
```
// Gets price of item or all items from cart
function getPriceFromCart() {
    // LET total equal 0
    let total = 0;
    // CONST item iterates through the cart arr
    for (const item of cart) {
        // increment priceInCents * takeFromInventory into total
        total += item.priceInCents * item.takeFromInventory;
    }
    // RETURN total converted into dollar value 
    return `$${(total / 100).toFixed(2)}`;
}
```

#### *`node index.js deleteCart:`*

Entering node index.js deleteCart into the command will delete the entirety of the items in the cart as a whole. Returning `undefined` in the command line as no data can be found after this command is ran in the cart.json array. 

```
// Input into command line
node index.js deleteCart

// Output
undefined 
```
**Functionality**

In index.js:
```
    // ELSE IF input is deleteCart
    else if (expectedCommand === "deleteCart") {
        // deletes cart of all items
        result = deleteCart();
    }
```

In cart.js:
```
// Deletes entire cart
function deleteCart() {
    // if the cart length equals 0
    cart.length = 0;
    // save the empty/deleted cart
    saveCart();
}
```

#### *`node index.js updateOneItem:`*

Entering node index.js updateOneItem into the command one can update any item found with into the cart by providing it's item id as with the example below `id:g8ifIw` then you can update the amount of said item that you want to take from the Sppoky Supplies' inventory by updating the `takeFromInventory:` key value being added after the item id key value in the command line. If the item id is provided it would just show you the item details and if the item id cannot be found the following error message will appear; `Error: item with ID not found`.

```
// Input into command line
node index.js updateOneItem id:g8ifIw takeFromInventory:2

// item before update
{
  itemName: 'Spooky, Spooky, Skeletons-3-Set',
  priceInCents: 3400,
  inStock: 9,
  id: 'g8ifIw',
  rating: 4.58,
  takeFromInventory: '1'
}

// Output
// item after update
{
  itemName: 'Spooky, Spooky, Skeletons-3-Set',
  priceInCents: 3400,
  inStock: 9,
  id: 'g8ifIw',
  rating: 4.58,
  takeFromInventory: '2'
}
```
**Functionality**

In index.js:
```
    // ELSE IF input is updateOneItem
    else if (expectedCommand === "updateOneItem") {
        // updates item in cart by providing id and key values you want to update
        result = updateOneItem(item.id, item);
    }
```

In cart.js:
```
// Update One item from cart
function updateOneItem(id, itemDetails) {
    // CONST result contains the item found at given index by item id
    const result = cart.findIndex(item => item.id === id);
    // IF index is an item
    if (cart[result]) {
        // item details will reflect key values and updated key values
        cart[result] = {
            ...cart[result],
            ...itemDetails
        };
        saveCart();
        // RETURN updated item 
        return cart[result];
    }
    // RETURN error message if id is not found
    return `Error: item with ID not found`;
}
```

#### *`node index.js printReceipt:`*

Entering node index.js printReceipt into the command will print out the sum total of the item/items in the cart in the form of a receipt that Spooky Supplies will provide to the customer with a receipt id in case a customer needs to get back to us about their purchase for whatever reason. The receipt will also list out what the customer has purchased along with several asthetic wording showing our gratitude and wishing the customer a Spooky Halloween. It ties all the strings together by employing a variable in this case `lines` and the `.join()` in conjunction with `\n` to divide the lines into their segmented parts. Finally the `npm chalk package` is used here to change the print out to `magenta` color and `italic` font.

```
// Input into command line
node index.js printReceipt

// Output
Thank you for shopping at Spooky Supplies!
------------------------------------------------------------------------------------
Bag of Brains: $46.25
Bag of Brains: $46.25
Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set: $6075.00
Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set: $6075.00
Spooky, Spooky, Skeletons-3-Set: $34.00
------------------------------------------------------------------------------------
TOTAL: $12276.50
RECEIPT ID: zc9rwj2vld9e
------------------------------------------------------------------------------------
Hope you have a Spooky Halloween!!!
```
**Functionality**

In index.js:
```
    // ELSE IF input is printReceipt
    else if (expectedCommand === "printReceipt") {
        // prints out receipt of cart purchase
        result = printReceipt()
    }
```

In cart.js:
```
// Prints the receipt of a cart
function printReceipt() {
    // CONST VAR contains faker generated random alphaNumeric id 
    const purchaseId = faker.random.alphaNumeric(12);
    // LET VAR contains lines of receipt 
    let lines = [ 
        `Thank you for shopping at Spooky Supplies!`,
        `------------------------------------------------------------------------------------`,
    ];
    // CONST item iterates through cart ARR
    for (const item of cart) {
        // PUSH key values in obj while giving the accumulated price of each item
        lines.push(`${item.itemName}: $${(item.priceInCents * item.takeFromInventory / 100).toFixed(2)}`);
    }
    // LET VAR hold function to get price from cart items
    let purchasePrice = getPriceFromCart();
    lines.push(`------------------------------------------------------------------------------------`);
    lines.push(`TOTAL: ${purchasePrice}`);
    lines.push(`RECEIPT ID: ${purchaseId}`);
    lines.push(`------------------------------------------------------------------------------------`);
    lines.push(`Hope you have a Spooky Halloween!!!`);
    // RETURN using chalk to change color and JOIN with \n to break up lines in receipt
    return chalk.magenta.italic(lines.join(`\n`));
}
```

## Functions which Save Data

The following functions are found in both `src/.js` files and are used to save data into the `.json` files found in the `data` folder for data persistency with in the test trial of the app. 

`fs.writeFileSync("./data/cart.json", stringifiedCart);` writes the data into the `cart.json` data set and `fs.writeFileSync("./data/spookysupplies.json", stringifiedItems);` writes the data into the `spookysupplies.json` data set.

```
// Saves the item or items and their details to cart.json file for persistence
function saveCart() {
    const stringifiedCart = JSON.stringify(cart);
    fs.writeFileSync("./data/cart.json", stringifiedCart);
}

// Saves the items to spookysupplies.json file for persistence
function saveItem() {
    const stringifiedItems = JSON.stringify(items);
    fs.writeFileSync("./data/spookysupplies.json", stringifiedItems);
}
```

## Happy Halloween!
Hope you enjoyed this demonstration of the Spooky Supplies App and don't forget to have a Happy Halloween! 
<!-- The text below is ASCII art of a Jack-o-Lantern with a Happy Halloween message next to it. Wrap it in a code block. -->
```                             
                            @@@
                             @@@
                              @@@                       H A P P Y
                              @@@
                      @@@@@@@@@@@@@@@@@@@@@@         H A L L O W E E N
                    @@@@@@@@@@@@@@@@@@@@@@@@@@
                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                @@@@@@@@ @@@@@@@@@@@@@@@@ @@@@@@@@
              @@@@@@@@@   @@@@@@@@@@@@@@   @@@@@@@@@
            @@@@@@@@@@     @@@@@@@@@@@@     @@@@@@@@@@
           @@@@@@@@@@       @@@@  @@@@       @@@@@@@@@@
           @@@@@@@@@@@@@@@@@@@@    @@@@@@@@@@@@@@@@@@@@
           @@@@@@@@@@@@@@@@@@        @@@@@@@@@@@@@@@@@@
           @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
           @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
           @@@@@@@@@ @@@@@@@@@@@@@@@@@@@@@@@@ @@@@@@@@@
            @@@@@@@@  @@ @@ @@ @@ @@ @@ @@ @  @@@@@@@@
              @@@@@@@                        @@@@@@@
                @@@@@@  @@ @@ @@ @@ @@ @@ @ @@@@@@
                  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                    @@@@@@@@@@@@@@@@@@@@@@@@@@
                      @@@@@@@@@@@@@@@@@@@@@@
```


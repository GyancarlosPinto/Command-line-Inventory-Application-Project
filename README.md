# Spooky Supplies Application

The ghouly season is upon us and for all who want to buy their Halloween Supplies the call has been answered with the Spooky Supplies App! With this application our staff at Spooky Supplies would be allowed to add in inventory of our stock into the online store. While, our view and cart functions will allow our customers to view and purchase our products. 

Here is how the code that is deployed by this app works. 

As this app is still in beta testing phase fake data was input in order to showcase the functions. Hence, in order to generate this data at random the following npm packages were installed.
1. npm install @faker-js/faker --save-dev
2. npm install nanoid@3

In order to test out the functionality of the application download npm install --save-dev jest.
- `npm install --save-dev jest.`

Finally, to add a bit of flare to a command line function later on an npm package for chalk was installed.


*node index.js create:*
Entering node index.js create into the command line 
```
// Input into command line
node index.js create itemName:"Jack-O-Lantern Skeleton"

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

Functionality

In index.js:
```
    if (expectedCommand === "create") {
        result = createItem(item)
    }
```

In spookysupplies.js:
```
// Create an item with details
function createItem(itemDetails) {
    itemDetails.priceInCents = faker.datatype.float({ min: 100, max: 1000000, precision: 1 })
    itemDetails.inStock = faker.datatype.float({ min: 0, max: 250, precision: 1 })
    itemDetails.itemId = nanoid(6);
    itemDetails.rating = Number(Math.random().toFixed(2));
    items.push(itemDetails);
    saveItem();
    return itemDetails;
}

```

node index.js get
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

```

    else if (expectedCommand === "get") {
        if (item.id) {
            result = getItemById(item.id);
        }
        else {
            result = getAllItems();
        }
    }
```

node index.js update
```
// Input into command line
node index.js update

    else if (expectedCommand === "update") {
        result = updateItem(item.id, item)
    }
```

node index.js delete
```
// Input into command line
node index.js delete

    else if (expectedCommand === "delete") {
        result = deleteItem(item.id);
    }
```

node index.js addToCart
```
// Input into command line
node index.js addToCart

    else if (expectedCommand === "addToCart") {
        const itemDetails = getItemById(item.id);
        if (itemDetails.inStock >= item.takeFromInventory) {
            result = addToCart(itemDetails, item.takeFromInventory);
        }
    }
```

node index.js getPriceFromCart
```
// Input into command line
node index.js getPriceFromCart

    else if (expectedCommand === "getPriceFromCart") {
        result = getPriceFromCart();
    }
```

node index.js deleteCart
```
// Input into command line
node index.js deleteCart

    else if (expectedCommand === "deleteCart") {
        result = deleteCart();
    }
```

node index.js updateOneItem
```
// Input into command line
node index.js updateOneItem

    else if (expectedCommand === "updateOneItem") {
        result = updateOneItem(item.id, item);
    }
```

node index.js printReceipt
```
// Input into command line
node index.js printReceipt

    else if (expectedCommand === "printReceipt") {
        result = printReceipt()
    }
```
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


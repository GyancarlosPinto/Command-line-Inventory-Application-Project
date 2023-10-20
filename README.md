# Spooky Supplies Application

### The ghouly season is upon us and for all who want to sell or buy their Halloween Supplies the call has been answered with the Spooky Supplies App! With this application sellers would be allowed to add the inventory of thHere is how the code that is deployed by this app works. 

```
// Input into command line
node index.js create

    if (expectedCommand === "create") {
        result = createItem(item)
    }

Functionality:


```

```
// Input into command line
node index.js get

    else if (expectedCommand === "get") {
        if (item.id) {
            result = getItemById(item.id);
        }
        else {
            result = getAllItems();
        }
    }
```

```
// Input into command line
node index.js update

    else if (expectedCommand === "update") {
        result = updateItem(item.id, item)
    }
```

```
// Input into command line
node index.js delete

    else if (expectedCommand === "delete") {
        result = deleteItem(item.id);
    }
```

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

```
// Input into command line
node index.js getPriceFromCart

    else if (expectedCommand === "getPriceFromCart") {
        result = getPriceFromCart();
    }
```

```
// Input into command line
node index.js deleteCart

    else if (expectedCommand === "deleteCart") {
        result = deleteCart();
    }
```

```
// Input into command line
node index.js updateOneItem

    else if (expectedCommand === "updateOneItem") {
        result = updateOneItem(item.id, item);
    }
```

```
// Input into command line
node index.js printReceipt

    else if (expectedCommand === "printReceipt") {
        result = printReceipt()
    }
```

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

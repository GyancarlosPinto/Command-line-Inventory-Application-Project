function generateElectronics() {
    const productTypes = [
      "earbuds",
      "headphones",
      "USB-C cable",
      "Thunderbolt Cable",
      "Android phones"
    ];
  
    return productTypes[
      Math.floor(Math.random() * productTypes.length)
    ]
  }
  
  faker.custom = {};
  faker.custom.electronics = generateElectronics;
  
  function id() {
    return Math.floor(Math.random() * 99999999999999);
  }
  
  faker.custom.id = id;
  
  for(let i = 0; i < 5; i ++) {
    const myProduct = {
      productType: faker.custom.electronics(),
      priceInCents: 0, // Generate with faker
      anythingElse: process.argv[4],
      id: faker.custom.id()
    }
    console.log(generateElectronics());
  }
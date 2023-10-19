const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);
let mockFileInfo = `[{"itemName":"Bag of Brains","priceInCents":925,"inStock":174,"id":"Afb726","rating":0.81,"takeFromInventory":"5"},{"itemName":"Bag of Brains","priceInCents":925,"inStock":174,"id":"Afb726","rating":0.81,"takeFromInventory":"5"},{"itemName":"Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set","priceInCents":607500,"inStock":2,"id":"Je8jE2","rating":4.34,"takeFromInventory":1},{"itemName":"Vampire the Masquerade All Hollows Eve Collector's Silverware Dining Set","priceInCents":607500,"inStock":2,"id":"Je8jE2","rating":4.34,"takeFromInventory":1},{"itemName":"Spooky, Spooky, Skeletons-3-Set","priceInCents":3400,"inStock":9,"id":"g8ifIw","rating":4.58,"takeFromInventory":"1"}]`;
function __setMockFiles(newMockFiles) {
    mockFiles = newMockFiles
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles

function readFileSync(dir) {
    return mockFileInfo;
}

function writeFileSync(dir, content) {
    mockFileInfo = content
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
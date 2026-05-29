const Merchant = require("../models/Merchant");
const Fuse = require("fuse.js");

let fuse = null;


// build searchable array
function buildSearchable(merchants) {

  const searchable = [];

  merchants.forEach((merchant) => {

    searchable.push({
      name: merchant.name,
      category: merchant.category
    });

    (merchant.aliases || []).forEach((alias) => {

      searchable.push({
        name: alias,
        category: merchant.category,
        original: merchant.name
      });

    });

  });

  return searchable;
}


// initialize once
async function initializeMerchantIndex() {

  const merchants = await Merchant.find();

  const searchable = buildSearchable(merchants);

  fuse = new Fuse(searchable, {
    keys: ["name"],
    threshold: 0.25,
    includeScore: true
  });

  console.log("✅ Merchant index initialized");
}


// getter
function getFuse() {
  return fuse;
}

module.exports = {
  initializeMerchantIndex,
  getFuse
};
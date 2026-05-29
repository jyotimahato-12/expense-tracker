
const  getFuse  = require("./merchantIndex");
;
const normalize=require("../t/normalise");

const extractCandidate=require("../t/extractCandidate");
// 🔥 1. Helper functions (TOP of file)
async function detectMerchant(text) {

  const fuse = getFuse();

  const cleaned = normalize(text);

  const candidate = extractCandidate(cleaned);

  const results = fuse.search(candidate);
  console.log(results.slice(0, 5));

  if (!results.length) return null;

  const best = results[0];

  if (best.score > 0.25) return null;

  return {
    name: best.item.original || best.item.name,
    category: best.item.category,
    confidence: 1 - best.score
  };
}
module.exports = detectMerchant;
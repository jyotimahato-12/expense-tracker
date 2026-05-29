function extractCandidate(text) {

  const words = text.split(" ");

  // common noise words
  const noise = new Set([
    "pvt",
    "ltd",
    "llp",
    "india",
    "limited",
    "store",
    "shop",
    "payment",
    "txn",
    "upi"
  ]);

  // remove noise words + tiny words
  const filtered = words.filter(
    (word) => !noise.has(word) && word.length > 2
  );

  // return top meaningful words
  return filtered.slice(0, 2).join(" ");
}
module.exports = extractCandidate;
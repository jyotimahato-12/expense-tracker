function normalize(text) {
  return text
    .toLowerCase()

    // remove common transaction words
    .replace(
      /paid to|sent to|received from|upi|txn|transaction|payment|via|debited|credited/gi,
      ""
    )

    // remove special characters
    .replace(/[^\w\s]/g, "")

    // remove extra spaces
    .replace(/\s+/g, " ")

    .trim();
}
module.exports = normalize;
const merchants = {

  // FOOD
  dominos: "Food",
  pizza: "Food",
  swiggy: "Food",
  zomato: "Food",
  mcdonalds: "Food",
  kfc: "Food",
  burgerking: "Food",

  // TRAVEL
  uber: "Travel",
  ola: "Travel",
  rapido: "Travel",
  taxi: "Travel",
  metro: "Travel",

  // SHOPPING
  amazon: "Shopping",
  flipkart: "Shopping",
  myntra: "Shopping",
  ajio: "Shopping",

  // BILLS
  electricity: "Bills",
  water: "Bills",
  wifi: "Bills",
  recharge: "Bills",

  // ENTERTAINMENT
  netflix: "Entertainment",
  spotify: "Entertainment",
  movie: "Entertainment",

  // HEALTH
  hospital: "Health",
  medicine: "Health",
  pharmacy: "Health"
};

function extractAmount(text) {

  // ₹450
  // INR 450.50
  // rs 1200

  const amountRegex =
    /(?:₹|rs\.?|inr)?\s?(\d+(?:\.\d+)?)/i;

  const match = text.match(amountRegex);

  return match
    ? Number(match[1])
    : 0;
}

function extractDate(text) {

  const today = new Date();

  if (text.includes("today")) {
    return today;
  }

  if (text.includes("yesterday")) {

    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    return yesterday;
  }

  // "2 days ago"

  const daysAgoRegex =
    /(\d+)\s+days?\s+ago/i;

  const daysAgoMatch =
    text.match(daysAgoRegex);

  if (daysAgoMatch) {

    const date = new Date();

    date.setDate(
      today.getDate() -
      Number(daysAgoMatch[1])
    );

    return date;
  }

  return today;
}

function detectMerchant(text) {

  for (const merchant in merchants) {

    const regex =
      new RegExp(`\\b${merchant}\\b`, "i");

    if (regex.test(text)) {
      return merchant;
    }
  }

  return "Unknown";
}

function detectCategory(text, merchant) {

  // Merchant-based category

  if (merchant !== "Unknown") {

    return {
      category: merchants[merchant],
      confidence: 0.95
    };
  }

  // Fallback AI-like keyword scoring

  const categoryKeywords = {

    Food: [
      "restaurant",
      "burger",
      "pizza",
      "biryani",
      "cafe"
    ],

    Travel: [
      "cab",
      "bus",
      "flight",
      "train"
    ],

    Shopping: [
      "shopping",
      "clothes",
      "shoes"
    ],

    Bills: [
      "bill",
      "rent",
      "electricity"
    ]
  };

  let bestCategory = "Other";
  let maxScore = 0;

  for (const category in categoryKeywords) {

    let score = 0;

    for (const keyword of categoryKeywords[category]) {

      if (text.includes(keyword)) {
        score++;
      }
    }

    if (score > maxScore) {

      maxScore = score;
      bestCategory = category;
    }
  }

  return {
    category: bestCategory,
    confidence:
      maxScore > 0
        ? 0.7
        : 0.3
  };
}

function parseExpense(description) {

  const text =
    description.toLowerCase();

  const merchant =
    detectMerchant(text);

  const categoryData =
    detectCategory(text, merchant);

  return {

    description,

    amount:
      extractAmount(text),

    merchant,

    category:
      categoryData.category,

    confidence:
      categoryData.confidence,

    date:
      extractDate(text),

    createdAt:
      new Date()
  };
}

module.exports = parseExpense;
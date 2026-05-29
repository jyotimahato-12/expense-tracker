
const 
 {initializeMerchantIndex}
= require("./services/merchantIndex");
const insightRoutes =require("./routes/insightsRoutes.js");
const expenseRoutes =require("./routes/expenseRoutes.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Merchant = require("./models/Merchant");
const connectDB = require("./config/db.js");

const detectMerchant=require("./services/detectMerchant.js");
const authRoutes=require("./routes/authRoutes.js");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/insights", insightRoutes);


app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("Backend Running");
});
app.post("/merchant", async (req, res) => {
  try {
    const data = await Merchant.create(req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// register routes





app.get("/merchants", async (req, res) => {

  const merchants = await Merchant.find();

  res.json(merchants);
});
app.post("/detect", async (req, res) => {
 console.log("🔥 /detect HIT");
  const text = req.body.description;

  const merchant = await detectMerchant(text);

  res.json(merchant);

});
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;

async function startServer() {

  try {

    await connectDB();

    await initializeMerchantIndex();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {

    console.log("❌ Server startup failed");
    console.log(err);

  }

}

startServer();
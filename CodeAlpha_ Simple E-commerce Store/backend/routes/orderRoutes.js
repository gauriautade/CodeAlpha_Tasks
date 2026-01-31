const express = require("express");
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 🔐 Middleware
function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = decoded.id;
  next();
}

// 📦 PLACE ORDER
router.post("/", auth, async (req, res) => {
  try {
    const order = new Order({
      userId: req.userId,
      products: req.body.products,
      total: req.body.total,
      address: req.body.address,
      phone: req.body.phone,
      payment: req.body.payment
    });

    await order.save();
    res.json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
});

// 📜 GET USER ORDERS (🔥 THIS WAS MISSING)
router.get("/", auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ date: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});



module.exports = router;


// 👨‍💼 ADMIN: GET ALL ORDERS
router.get("/admin/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ date: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});


router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.userId });
  res.json(orders);
});

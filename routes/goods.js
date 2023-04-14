const express = require("express");
const router = express.Router();

const Goods = require("../schemas/goods");
const Cart = require("../schemas/cart");

router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCart = await Cart.find({ goodsId });
  if (existsCart.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당하는 상품이 존재합니다.",
    });
  }
  await Cart.create({ goodsId, quantity });
  res.json({ result: "success" });
});

// 상품 생성 API
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCart = await Cart.find({ goodsId });
  if (existsCart.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
    );
  }
  res.status(200).json({ success: true });
});

router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCart = await Cart.find({ _id: goodsId });
  if (existsCart.length) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

module.exports = router;

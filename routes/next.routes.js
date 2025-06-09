import express from "express";
const router = express.Router();

router.get("/next", (req, res) => {
  res.render("next"); // This should match your .ejs file name
});

export default router;


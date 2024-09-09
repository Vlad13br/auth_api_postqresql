const express = require("express");

const auth = require("../middlewares/auth");
const ctrlWrapper = require("../middlewares/ctrlWrapper");
const {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
} = require("../controllers/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAllContacts)); //

router.get("/:id", ctrlWrapper(getContactById)); //

router.post("/", auth, ctrlWrapper(createContact)); //

router.put("/:id", ctrlWrapper(updateContact)); //

router.delete("/:id", ctrlWrapper(deleteContact)); //

module.exports = router;

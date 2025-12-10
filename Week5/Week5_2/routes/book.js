const express = require("express");
const router = express.Router();

const controllers = require("../controllers");

router.get('/', controllers.bookController.getAllBook);
router.get('/:id', controllers.bookController.getBookById);

module.exports = router;
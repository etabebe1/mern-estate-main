const { errorHandler } = require("../errors/error");
const ItemList = require("../model/list.model");

//*:::::: controller to update a user ::::::*//
const createItem = async (req, res, next) => {
  try {
    const itemList = await ItemList.create(req.body);
    res.status(200).json(itemList)
  } catch (error) {
    next(error);
  }
};

module.exports = { createItem };

const { errorHandler } = require("../errors/error");
const ItemList = require("../model/list.model");

//*:::::: controller to create listing ::::::*//
const createItem = async (req, res, next) => {
  try {
    const itemList = await ItemList.create(req.body);
    res.status(200).json(itemList);
  } catch (error) {
    next(error);
  }
};

//*:::::: controller to fetch listing ::::::*//
const getUserListing = async (req, res, next) => {
  let {
    params: { id },
    user: { id: userId },
  } = req;

  if (userId === id) {
    try {
      const listing = await ItemList.find({ userRef: id });
      res.status(200).json(listing);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listing."));
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await ItemList.findOne({ _id: req.params.id });

  if (!listing) return next(errorHandler(404, "Listing not found"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your own listings!"));

  try {
    await ItemList.findOneAndDelete({ _id: req.params.id });
  } catch (error) {
    next(error);
  }

};

module.exports = { createItem, getUserListing, deleteListing };

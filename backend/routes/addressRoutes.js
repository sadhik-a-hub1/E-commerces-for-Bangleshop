const express = require("express");

const {
    createAddress,
    getAddresses,
    getAddressById,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController");

const {
    protect
} = require("../middleware/authMiddleware");


const router = express.Router();


router.post(
    "/",
    protect,
    createAddress
);


router.get(
    "/",
    protect,
    getAddresses
);


router.get(
    "/:id",
    protect,
    getAddressById
);


router.put(
    "/:id",
    protect,
    updateAddress
);


router.delete(
    "/:id",
    protect,
    deleteAddress
);


module.exports = router;
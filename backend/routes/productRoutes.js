const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts
} = require("../controllers/productController");


const upload = require("../middleware/uploadMiddleware");


const router = express.Router();


// Product CRUD
router.post(
    "/",
    upload.array("images", 5),
    createProduct
);

router.get(
    "/",
    getProducts
);

router.get(
    "/featured",
    getFeaturedProducts
);

router.get(
    "/search",
    searchProducts
);

router.get(
    "/category/:id",
    getProductsByCategory
);

router.get(
    "/:id",
    getProductById
);

router.put(
    "/:id",
    upload.array("images", 5),
    updateProduct
);

router.delete(
    "/:id",
    deleteProduct
);


module.exports = router;
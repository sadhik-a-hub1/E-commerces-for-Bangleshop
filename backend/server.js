const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

// Initialize App
const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Uploaded Images
app.use(
"/uploads",
express.static(
path.join(__dirname, "uploads")
)
);

// Authentication Routes
app.use("/api/auth", authRoutes);

// Product & Category Routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Customer Routes
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/address", addressRoutes);

// Order & Payment Routes
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

// Admin Routes
app.use("/api/admin", adminRoutes);

// User Routes
app.use("/api/users", userRoutes);

// Home Route
app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "Bangles E-commerce Backend API Running Successfully"
});
});

// 404 Route Handler
app.use((req, res) => {
res.status(404).json({
success: false,
message: "API Route Not Found"
});
});

// Start Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log(
`🚀 Server running on http://localhost:${PORT}`
);
});

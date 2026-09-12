require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");
const Reel = require("./models/Reel");

const reels = [
  // Noodles
  {
    title: "Spicy Noodles",
    category: "noodles",
    video: "/videos/noodles.mp4",
    price: 179,
    description: "Spicy noodles food reel",
  },
  {
    title: "Chilli Noodles",
    category: "noodles",
    video: "/videos/noodles2.mp4",
    price: 189,
    description: "Chilli noodles food reel",
  },
  {
    title: "Street Noodles",
    category: "noodles",
    video: "/videos/noodles3.mp4",
    price: 199,
    description: "Street style noodles food reel",
  },

  // Pizza
  {
    title: "Cheesy Pizza",
    category: "pizza",
    video: "/videos/pizza.mp4",
    price: 299,
    description: "Cheesy pizza food reel",
  },
  {
    title: "Loaded Pizza",
    category: "pizza",
    video: "/videos/pizza2.mp4",
    price: 349,
    description: "Loaded pizza food reel",
  },
  {
    title: "Fresh Pizza",
    category: "pizza",
    video: "/videos/pizza3.mp4",
    price: 329,
    description: "Fresh pizza food reel",
  },

  // Burger
  {
    title: "Classic Burger",
    category: "burger",
    video: "/videos/burger.mp4",
    price: 249,
    description: "Classic burger food reel",
  },
  {
    title: "Cheese Burger",
    category: "burger",
    video: "/videos/burger2.mp4",
    price: 279,
    description: "Cheese burger food reel",
  },
  {
    title: "Loaded Burger",
    category: "burger",
    video: "/videos/burger3.mp4",
    price: 299,
    description: "Loaded burger food reel",
  },

  // Biryani
  {
    title: "Chicken Biryani",
    category: "biryani",
    video: "/videos/biryani.mp4",
    price: 329,
    description: "Chicken biryani food reel",
  },
  {
    title: "Hyderabadi Biryani",
    category: "biryani",
    video: "/videos/biryani2.mp4",
    price: 349,
    description: "Hyderabadi biryani food reel",
  },
  {
    title: "Special Biryani",
    category: "biryani",
    video: "/videos/biryani3.mp4",
    price: 379,
    description: "Special biryani food reel",
  },

  // Pasta
  {
    title: "Creamy Pasta",
    category: "pasta",
    video: "/videos/pasta.mp4",
    price: 279,
    description: "Creamy pasta food reel",
  },
  {
    title: "White Sauce Pasta",
    category: "pasta",
    video: "/videos/pasta2.mp4",
    price: 299,
    description: "White sauce pasta food reel",
  },
  {
    title: "Red Sauce Pasta",
    category: "pasta",
    video: "/videos/pasta3.mp4",
    price: 289,
    description: "Red sauce pasta food reel",
  },

  // Dessert
  {
    title: "Chocolate Dessert",
    category: "dessert",
    video: "/videos/dessert.mp4",
    price: 199,
    description: "Chocolate dessert food reel",
  },
  {
    title: "Creamy Dessert",
    category: "dessert",
    video: "/videos/dessert2.mp4",
    price: 219,
    description: "Creamy dessert food reel",
  },
  {
    title: "Sweet Special",
    category: "dessert",
    video: "/videos/dessert3.mp4",
    price: 229,
    description: "Sweet special dessert reel",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await Reel.deleteMany({});

    const users = [
      {
        name: "Demo User",
        email: "user@foodreel.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
      },
      {
        name: "Demo Manager",
        email: "manager@foodreel.com",
        password: await bcrypt.hash("manager123", 10),
        role: "manager",
      },
    ];

    await User.create(users);
    await Reel.insertMany(reels);

    console.log("✅ Users created successfully");
    console.log(`✅ ${reels.length} reels created successfully`);
    console.log("✅ Seed complete");

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
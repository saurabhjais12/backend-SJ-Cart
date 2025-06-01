const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://saurabhjais2000:saurabh2002@sj-cart-mern.tof9b.mongodb.net/SJ-CART-MERN?retryWrites=true&w=majority&appName=SJ-CART-MERN",

    );
    console.log("DB Connected SuccessFully");
  } catch (err) {
    console.error(" DB NOT Connected:", err.message);
  }
};

module.exports = connectDB;

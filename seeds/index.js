const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");

mongoose.connect("mongodb://localhost:27017/yelpApp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  const price = Math.floor(Math.random() * 1000);

  for (let i = 0; i < 50; i++) {
    const camp = new Campground({
      author: "60dd958223df7a5cebbe1bff",
      location: `${cities[price].city}, ${cities[price].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      price,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Feugiat nibh sed pulvinar proin. Et netus et malesuada fames ac. Dignissim suspendisse in est ante. Odio pellentesque diam volutpat commodo sed egestas egestas fringilla.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

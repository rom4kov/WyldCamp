const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');
const req = require('express/lib/request');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6271a6f89f43ab1a5c3673c9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium praesentium doloribus dolorem molestiae tenetur magni laborum minus at libero a, perspiciatis facere ea culpa fugit natus suscipit vel voluptas distinctio?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dyfatvv85/image/upload/v1652386709/YelpCamp/vukzrgddcjknvyzlub0k.jpg',
                    filename: 'YelpCamp/vukzrgddcjknvyzlub0k'
                },
                {
                    url: 'https://res.cloudinary.com/dyfatvv85/image/upload/v1652012641/YelpCamp/j91lp0eh9nztd0hd4b1z.jpg',
                    filename: 'YelpCamp/j91lp0eh9nztd0hd4b1z'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require('mongoose')
require('dotenv').config()
// const mongoDbClient = require("mongodb").MongoClient
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://ajitsingh:as5759423@cluster0.8lgsfn3.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

module.exports = function (callback) {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
        if (err) {
            console.log("❌ MongoDB Connection Error: " + err)
            console.log("🔧 Please check:")
            console.log("   1. MongoDB Atlas cluster is running")
            console.log("   2. Network access allows your IP")
            console.log("   3. Database user credentials are correct")
            console.log("   4. Connection string is valid")
        }
        else {
            // var database =
            console.log("✅ Connected to MongoDB successfully!")
            const foodCollection = await mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                if (err) {
                    console.log("❌ Error fetching food_items:", err)
                } else {
                    console.log(`📦 Found ${data.length} food items`)
                }
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    if (err) {
                        console.log("❌ Error fetching Categories:", err)
                    } else {
                        console.log(`📂 Found ${Catdata.length} categories`)
                    }
                    callback(err, data, Catdata);
                })
            });
            // listCollections({name: 'food_items'}).toArray(function (err, database) {
            // });
            //     module.exports.Collection = database;
            // });
        }
    })
};

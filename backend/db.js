const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI
                 
const mongoDB = async () => {
    try {
    

        await mongoose.connect(mongoURI);

        const foodItems = await mongoose.connection.db.collection("Food_data").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("Food_category").find({}).toArray();

        return { foodItems, foodCategory }



    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoDB;



const mongoose = require(`mongoose`);
require(`../models/User`);
require(`../models/Trip`);

//Todo change database name 
const dababaseName = `sharedTrip`
const conetctionString = `mongodb://localhost:27017/${dababaseName}`

module.exports = async(app) =>{
    try {

        await mongoose.connect(conetctionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
    
        })
    
        console.log(`Database is contected`);
    
        mongoose.connection.on(`error`, (err) => {
            console.error(`Database error`);
            console.error(err);
        });

    } catch (err) {
        console.error(`Error connetion on database`);
        process.exit(1)
    }
}
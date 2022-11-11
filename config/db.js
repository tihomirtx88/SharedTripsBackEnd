const mongoose = require(`mongoose`);
require(`../models/User`);
require(`../models/Trip`);

const dababaseName = `sharedTrip`
// const conetctionString = `mongodb://localhost:27017/${dababaseName}`
const conetctionString = `mongodb+srv://bodil4o88:8812267960@cluster0.b8lw2kg.mongodb.net/${dababaseName}`

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

        console.log(err);
        console.error(`Error connetion on database`);
        process.exit(1)
    }
}
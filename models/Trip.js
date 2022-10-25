const { model, Schema, Types: {ObjectId} } = require("mongoose");

const URL_PATERN = /^https?:\/\/(.+)$/

const tripSchema = new Schema({
    start: {
        type: String,
        required: true,
        minLength: [4, `Start point must be at least 4 characters long`]
    },
    end: {
        type: String,
        required: true,
        minLength: [4, `End point must be at least 4 characters long`]
    },
    date: {
        type: String,
        required: true
    },
	time: {
        type: String,
        required: true
    },
	carImg: {
        type: String,
        required: true,
        validate: {
            validator(value){
               return URL_PATERN.test(value);
            },
            message: `Image must be valid!!`
        }
    },
	carBrand: {
        type: String,
        required: true,
        minLength: [4, `Car Brand  must be at least 4 characters long`]
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
	description: {
        type: String,
        required: true,
        minLength: [10, `Description must be at least 10 characters long`]
    },
	owner: {
        type: ObjectId,
        ref: `User`,
        required: true
    },
    buddies: {
        type: [ObjectId],
        ref: `User`,
        default: []
    },
})


const Trip = model(`Trip`, tripSchema);

module.exports = Trip;

	

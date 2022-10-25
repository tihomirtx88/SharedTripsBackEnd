const { model, Schema, Types: {ObjectId} } = require("mongoose");

const EMAIL_PATERM = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator(value){
               return EMAIL_PATERM.test(value);
            },
            message: `Email must be valid!!`
        }
    },
    hashedPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: [`male`, `female`]
    },
    trips: {
        type: [ObjectId],
        ref: `Trip`,
        default: []
    },
});

userSchema.index({email: 1}, {
    unique: true,
    collation: {
        locale: `en`,
        strength: 2
    }
})

const User = model(`User`, userSchema);

module.exports = User;
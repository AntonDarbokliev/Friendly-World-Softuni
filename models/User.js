const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require ('bcrypt')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
    minLength: [10, "Email should be at least 10 characters long"],
  },
  password: {
    type: String,
    required : [true, 'Please enter a valid password'],
    minLength : [3,'Password should be at least 3 characters long'],
    validate : {
        validator : function (value) {
            return /^[A-Za-z0-9]+$/.test(value)
        },
        message : 'Password can only use english letters and numbers'
    }
  },

});



userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password,10)
    this.password = hash
})

const User = model("User", userSchema);
module.exports = User;

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Log must have a name'],
        minLength: [3, 'Log name must be at least 3 characters'],
        unique: "Sorry, a user with the email already exists",
        validate: {
            validator: function(val) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
            },
            message: 'Please enter a valid email'
        }
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        minLength: [2, 'First name must be at least 2 characters long']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        minLength: [2, 'Last name must be at least 2 characters long']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [2, 'Password must be at least 2 characters long']
    },
    library: {
        type: Array,
        default: []
    }
}, {timestamp: true})

UserSchema.virtual("confirmPw")
    .get(()=>this._confirmPw)
    .set((value)=> this._confirmPw = value)

UserSchema.pre("validate", function(next){
    if(this.password !== this.confirmPw){
        this.invalidate("confirmPw", "Passwords must match");
        console.log("confirmPw didn't match");
    }
    console.log(this.password, this.confirmPw);
    //using the pre middleware function, next allows us to move from one to the other.
    next();
}) 

UserSchema.pre("save", function(next){
    console.log("in pre save");
    bcrypt
    .hash(this.password, 10)
    .then((hashedPassword)=>{ 
        this.password = hashedPassword;
        next();
    })
});

const User = mongoose.model("User", UserSchema)

module.exports = User
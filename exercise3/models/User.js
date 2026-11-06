import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    role:{
        type: String,
        enum: ['admin','user'],
        default: 'user'
    }
})

// Hash password before saving
userSchema.pre('save', async function(){

  // if the password has been the same or not updated
  if(!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 10)

})

// Method compare password
userSchema.methods.comparePassword = function(inputPassword){
  return bcrypt.compare(inputPassword, this.password)
} 


const User = mongoose.model('User', userSchema);
export default User
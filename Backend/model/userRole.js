const mongoose =require('mongoose');

const userRoleSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    Role:{
        type: String,
        enum:["admin","HR","RM","LC"],
        default:"admin",
    },
    status:{
        type: Number,
        enum:[0 , 1],
        default:1,
    },
    _id:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        auto: true
    },

})

userRoleSchema.pre("save",function (next){
    if(this.isModified("Role")){
        this.status=this.Role ==="admin" ? 1 : 0;
    }
    next()
})

const User=mongoose.model("userRole",userRoleSchema);

module.exports=User;
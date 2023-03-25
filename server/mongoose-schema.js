let mongoose=require('mongoose')
let Schema= mongoose.Schema

let transactionSchema= Schema({
    id:{
        type:Schema.Types.ObjectId,
        required: true
    },
    Date:{
        type:String,
        required: true
    },
    Merchant:{
        type:String,
    },
    Total:{
        type:String,
        required: true
    },
    Comment:{
        type:String,
        required: true
    },
    ttype:{
        type:String,
        required: true
    }
})

let accountSchema= Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    userpassword:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    tel:{
        type: Number,
        required:true
    },
    transactions:[transactionSchema]
})

module.exports={transactionSchema, accountSchema}
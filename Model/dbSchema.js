//Database model for Users
const { strict } = require('jade/lib/doctypes');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)
mongoose.connect('mongodb://localhost:27017/mCart',{
    useNewUrlParser: true,
}).then(()=>console.log('Connecion to DB successful !'));


const loginSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    phoneNumber:{
        type:Number,
    },
    email:{
        type:String,
    }
});

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
    },
    productCode:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    rating:{
        type:Number,
    },
    manufacturer:{
        type:String,
    },
    ostype:{
        type:String,
    }
});

const cartSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    productsInCart:[{
        productId:Number,
        productName:String,
        quantity : Number,
    }],
    statusOfCart:{
        type:String,
        default:"Open",
    }
});

// const orderSchema = new mongoose.Schema({
//     cartId:Number,
// });

// orderSchema.plugin(autoIncrement,{inc_field:'orderId'});

productSchema.plugin(autoIncrement,{inc_field:'productId'});
cartSchema.plugin(autoIncrement,{inc_field:'cartId'});
// const orderModel = mongoose.model('orders',orderSchema);
const cartModel = mongoose.model('carts',cartSchema);
const productModel = mongoose.model('products',productSchema);
const loginModel = mongoose.model('users',loginSchema);


module.exports = {loginModel,productModel,cartModel};
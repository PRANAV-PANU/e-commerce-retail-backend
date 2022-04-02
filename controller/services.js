// All the utility functions for routing are here

const model = require('../Model/dbSchema.js');

exports.getAllUsers = async (req, res, next) => {
    try {
        const allUsers = await model.loginModel.find({}, { _id: 0, __v: 0 });
        if (allUsers.length != 0) {
            res.status(200).json({
                allUsers,
            });
        } else {
            res.status(201).json({
                message: "No users registered yet !!!",
            });
        }
    } catch (err) {
        next(err);
    }
};
exports.registerUser = async (req, res, next) => {
    try {
        const newUser = await model.loginModel.create(req.body);
        if (newUser.length != 0) {
            res.status(200).json({
                message: `User registered with username : ${newUser.username}`,
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await model.loginModel.find({ username: req.body.username, password: req.body.password });
        if (user != 0) {
            res.status(200).json({
                message: "Signed in Successfully",
            });
        } else {
            res.status(400).json({
                message: "Please Enter Valid Credentials or log in successfully",
            })
        }
    } catch (error) {
        next(error);
    }
};
exports.deleteUser = async (req, res, next) => {
    try {
        const deleteUser = await model.loginModel.deleteOne({ username: req.params.username });
        if (deleteUser.length != 0) {
            res.status(200).json({
                message: `User deleted with username : ${req.params.username}`,
            })
        } else {
            res.status(201).json({
                message: "No user with username found",
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.addProduct = async (req, res, next) => {
    try {
        const newProduct = await model.productModel.create(req.body);
        if (newProduct.length != 0) {
            res.status(200).json({
                message: `product added with productId : ${newProduct.productId}`,
            });
        }
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await model.productModel.find({}, { _id: 0, __v: 0 });
        if (allProducts.length != 0) {
            res.status(200).json({
                allProducts,
            });
        } else {
            res.status(201).json({
                message: "No products registered yet !!!",
            });
        }
    } catch (err) {
        next(err);
    }
};

exports.getTablets = async (req, res, next) => {
    try {
        const tab = await model.productModel.find({ productCode: { $regex: "tab", $options: "i" } });
        if (tab.length != 0) {
            res.status(200).json({
                tab
            })
        } else {
            res.status(201).json({
                message: "No Tablets present at the moment !!",
            })
        }
    } catch (error) {
        next(error);
    }
}
exports.getMobiles = async (req, res, next) => {
    try {
        const mob = await model.productModel.find({ productCode: { $regex: "mob", $options: "i" } });
        if (mob.length != 0) {
            res.status(200).json({
                mob,
            });
        } else {
            res.status(201).json({
                message: "No Mobiles present at the moment",
            })
        }
    } catch (error) {
        next(error);
    }
}
exports.getAllCarts = async (req, res, next) => {
    try {
        const allCarts = await model.cartModel.find({}, { _id: 0, __v: 0 });
        if (allCarts.length != 0) {
            res.status(200).json({
                carts: allCarts,
            })
        } else {
            res.status(201).json({
                message: "No products in Cart yet",
            })
        }
    } catch (error) {
        next(error);
    }
}
exports.getUserCarts = async (req, res, next) => {
    try {
        const user = await model.cartModel.find({ username: req.params.username });
        if (user.length != 0) {
            res.status(200).json({
                message: user
            })
        } else {
            res.status(201).json({
                message: `No cart found for the username ${req.params.username}`,
            })
        }
    } catch (error) {
        next(error);
    }
}
exports.addToCart = async (req, res, next) => {
    try {
        const user = await model.cartModel.find({ username: req.body.username });

        if (user.length != 0) {
            res.status(200).json({
                message: `User Cart is already available, append to the same cart`,
            });
        } else {
            const addCart = await model.cartModel.create(req.body);
            if (addCart.length != 0) {
                res.status(200).json({
                    message: `Added to Cart with CartId : ${addCart.cartId} Successfully`,
                    data: addCart,
                })
            } else {
                res.status(400).json({
                    message: "No Values inserted",
                })
            }
        }
    } catch (error) {
        next(error);
    }
}
exports.addToUserCart = async (req, res, next) => {
    try {
        const addItems = await model.cartModel.updateOne({ username: req.params.username },
            { $push: { productsInCart: req.body.productsInCart } });

        if (addItems.acknowledged == true) {
            const users = await model.cartModel.find({ username: req.params.username });
            if (users.length != 0) {
                res.status(200).json({
                    message: `Cart Id : ${users[0].cartId} updated successfully`,
                });
            }
        } else {
            res.status(201).json({
                message: "Items could not be updated",
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.placeOrder = async (req, res, next) => {

}
exports.deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await model.productModel.deleteOne({ productName: req.params.productName });

        if (deleteProduct.length != 0) {
            res.status(200).json({
                message: `Product deleted with Product Name : ${req.params.productName}`,
            })
        } else {
            res.status(201).json({
                message: `No product found with Product Name : ${req.params.productName}`
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.default = async (req, res, next) => {
    try {
        res.status(404).json({
            message: "Invalid Path",
        })
    } catch (err) {
        next(err);
    }
}
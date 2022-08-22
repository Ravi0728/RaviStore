const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors'); 
const ApiFeatures = require('../utils/apifeatures');



exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});

//Get All Product
exports.getAllProduct = catchAsyncErrors(async (req, res) => {

    const apiFeature = new ApiFeatures(Product.find(), req.query);
    const products =  await Product.find();

    res.status(200).json({
        success: true,
        products
    });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors( async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found",404));
    }

    res.status(200).json({
        success: true,
        product
    })
});

// Update Product -- Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found",404));
    }
     else {
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, 
            runValidators:true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        })
    } 
}

// Delete Product
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not Found",404));
    }else {
        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
}

// Create Product -- Admin
// exports.createProduct = async (req, res, next) => {
//     const product = await Product.create(req.body);

//     res.status(201).json({
//         success: true,
//         product
//     })
// }
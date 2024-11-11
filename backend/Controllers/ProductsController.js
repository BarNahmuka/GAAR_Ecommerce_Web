const Product = require('../Models/productModal'); 
const catchAsync = require('../../src/Utills/catchAsync'); 
const AppError = require('../../src/Utills/appError'); 

exports.importAllProductsFromApi = catchAsync(async (req, res, next) => {
    const product = req.body;
    await Product.deleteMany({});
    const productsAll = await Product.insertMany(product.map(p => ({
      title: p.title,
      category: p.category.name || p.category, 
      price: p.price,
      images: p.images && p.images.length > 0 ? p.images.map(img => img.replace(/[\[\]"]/g, '')) : [],
      description: p.description
    })));

    if(!productsAll)
    {
      return next(new AppError('Products not found', 400));
    }
    res.status(201).json({ message: 'Products imported successfully!' });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.find({});
    if(!products) {
      return next(new AppError('Products not found', 400));
    }
    res.status(200).json(products);
});

exports.getAllProductsByCategory = catchAsync(async (req, res, next) => {
  const products = await Product.find({category:req.params.category.toLowerCase()});
  if(!products) {
    return next(new AppError('Products not found', 400));
  }
  res.status(200).json(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
    const { productId } = req.params;
      const product = await Product.findById(productId);
      if(!product) {
        return next(new AppError('Product not found', 400));
      }
      res.status(200).json(product);
});

exports.createNewProduct = catchAsync(async (req, res, next) => {
    const { title, category, price, image, description } = req.body;
  
      const existingProduct = await Product.findOne({ title });
      if (existingProduct) {
        return next(new AppError('Product already exists', 400));
      }
      const newProduct = new Product({ title, category, price, image, description });
      const savedProduct = await newProduct.save();
      
      res.status(201).json(savedProduct); 
});
  
exports.updateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true
    });

    if(!product) {
      return next(new AppError('Product not found', 400));
    }
    res.status(200).json({
      status: 'success',
      data: { product }
    });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { title } = req.query; 
    const result = await Product.deleteMany({ title });
  
    if(!result) {
      return next(new AppError('Products not found and can not deleted', 400));
    }
      res.status(200).json({
         status: 'success', 
         message: `${result.deletedCount} product deleted` });
});

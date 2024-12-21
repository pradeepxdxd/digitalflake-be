import adminModel from "../models/admin.model.js";
import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";
import subCategoryModel from "../models/subCategory.model.js";

export const addProductService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const { p_name, c_id, sub_id, status } = req.body;
        const productExist = await productModel.findOne({ p_name });

        if (productExist) {
            return res.status(400).send({ status: false, msg: 'Product already exist' })
        }

        const newProduct = await productModel.create({ p_name, c_id, sub_id, status });
        if (newProduct) {
            return res.status(201).send({
                status: true,
                msg: 'New Product Added',
                product: newProduct
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }

}

export const getProductByIdService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const productDetail = await productModel.findById(req.params.id);

        const categoryDetails = await categoryModel.findById(productDetail.c_id);
        const subCategoryDetails = await subCategoryModel.findById(productDetail.sub_id);

        const modifiedData = {
            _id: productDetail._id,
            p_name: productDetail.p_name,
            c_id: productDetail.c_id,
            c_name: categoryDetails.c_name,
            sub_id: productDetail.sub_id,
            sub_c_image: subCategoryDetails.sub_c_image,
            sub_c_name: subCategoryDetails.sub_c_name,
            status: productDetail.status
        }

        if (productDetail) {
            return res.status(200).send({
                status: true,
                product: modifiedData
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }

}

export const editProductService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const { sub_id, sub_c_image } = req.body

        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        if (updatedProduct) {
            await subCategoryModel.findByIdAndUpdate(sub_id,
                {
                    $set: {
                        sub_c_image
                    }
                },
                {
                    new: true
                }
            )
            return res.status(201).send({
                status: true,
                msg: 'Product updated successfully',
                product: updatedProduct
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }

}

export const deleteProductService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        await productModel.findByIdAndDelete(req.params.id);
        res.status(204).send({ status: true, msg: 'Product deleted' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }

}

export const getAllProductService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const allProducts = await productModel.find().populate([
            {
                path: "c_id",
                model: categoryModel, // Reference to the category model
                select: "c_name" // Fields to include from the category
            },
            {
                path: "sub_id",
                model: subCategoryModel,
                select: "sub_c_name sub_c_image",
            }
        ])

        if (allProducts && allProducts.length > 0) {
            return res.status(200).send({
                status: true,
                product: allProducts
            })
        }
        res.status(404).send({ status: false, msg: 'Category not found' });
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}
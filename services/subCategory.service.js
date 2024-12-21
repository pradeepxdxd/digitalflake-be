import adminModel from "../models/admin.model.js";
import subCategoryModel from "../models/subCategory.model.js";
import categoryModel from '../models/category.model.js'

export const addSubCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const { sub_c_name, sub_c_image, status, c_id } = req.body;

        const subCategoryExist = await subCategoryModel.findOne({ sub_c_name });

        if (subCategoryExist) {
            return res.status(400).send({ status: false, msg: 'Sub category already exist!' });
        }

        const newSubCategory = await subCategoryModel.create({ sub_c_name, sub_c_image, status, c_id });
        if (newSubCategory) {
            return res.status(201).send({
                status: true,
                msg: 'Sub category added',
                sub_category: newSubCategory
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getSubCategoryByIdService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const subCategoryDetail = await subCategoryModel.findById(req.params.id);

        const categoryDetails = await categoryModel.findById(subCategoryDetail?.c_id);

        const modifiedData = {
            _id: subCategoryDetail?._id,
            c_name: categoryDetails.c_name,
            sub_c_name: subCategoryDetail.sub_c_name,
            sub_c_image: subCategoryDetail.sub_c_image,
            status: subCategoryDetail.status,
            c_id: subCategoryDetail.c_id
        }

        if (modifiedData) {
            return res.status(200).send({
                status: true,
                sub_category: modifiedData
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const editSubCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const updatedSubCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        if (updatedSubCategory) {
            return res.status(200).send({
                status: true,
                msg: 'Sub Category updated successfully',
                sub_category: updatedSubCategory
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' })
    }
}

export const deleteSubCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const deletedSubCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
        if (deletedSubCategory) {
            return res.status(204).send({
                status: true,
                msg: "Sub category deleted",
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' })
    }
}

export const getAllSubCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const allSubCategories = await subCategoryModel.find().populate({
            path: "c_id",
            model: categoryModel, // Reference to the category model
            select: "c_name" // Fields to include from the category
        });

        if (allSubCategories && allSubCategories.length > 0) {
            return res.status(200).send({
                status: true,
                sub_category: allSubCategories
            })
        }
        res.status(404).send({ status: false, msg: 'Sub Category not found' });
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getActiveSubCategoryService = async (req, res) => {
    try {
        const activeCategories = await subCategoryModel.find(
            { status: true }, // Query filter
            { sub_c_name: 1 }
        );

        // Check if categories exist
        if (activeCategories.length > 0) {
            return res.status(200).json({
                status: true,
                data: activeCategories,
            });
        } else {
            return res.status(404).json({
                status: false,
                message: 'No active sub categories found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
}
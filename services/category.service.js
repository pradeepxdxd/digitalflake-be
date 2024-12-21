import adminModel from '../models/admin.model.js'
import categoryModel from '../models/category.model.js';

export const addCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const { c_name, c_image, status } = req.body;

        const categoryExist = await categoryModel.findOne({ c_name });
        if (categoryExist) {
            return res.status(400).send({ status: false, msg: 'Category already exist!' });
        }

        const newCategory = await categoryModel.create({ c_name, c_image, status });
        if (newCategory) {
            return res.status(201).send({
                status: true,
                msg: 'New category added',
                category: newCategory
            })
        }

        res.status(400).send({ status: false, msg: 'Something went wrong' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getCategoryByIdService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const categoryDetail = await categoryModel.findById(req.params.id);
        if (categoryDetail) {
            return res.status(200).send({
                status: true,
                category: categoryDetail
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' });
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const editCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const updatedCategory = await categoryModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });

        if (updatedCategory) {
            return res.status(201).send({
                status: true,
                msg: 'Updated successfully',
                category: updatedCategory
            })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const deleteCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const deletedCategory = await categoryModel.findByIdAndDelete(req.params.id);

        if (deletedCategory) {
            return res.status(204).send({ status: true, msg: 'Category deleted' })
        }
        res.status(400).send({ status: false, msg: 'Something went wrong' })
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getAllCategoryService = async (req, res) => {
    try {
        const userExist = await adminModel.findById(req.user.id);
        if (!userExist) {
            return res.status(404).send({ status: false, msg: 'User not found!' })
        }

        const allCategories = await categoryModel.find({});

        if (allCategories && allCategories.length > 0) {
            return res.status(200).send({
                status: true,
                category: allCategories
            })
        }
        res.status(404).send({ status: false, msg: 'Category not found' });
    } catch (error) {
        console.log(err)
        res.status(500).send({ status: false, msg: 'Internal Server Error' });
    }
}

export const getActiveCategoryService = async (req, res) => {
    try {
        const activeCategories = await categoryModel.find(
            { status: true }, // Query filter
            {c_name : 1}
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
                message: 'No active categories found',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: 'Internal Server Error',
        });
    }
};
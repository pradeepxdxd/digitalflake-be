import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    sub_c_name: {
        type: String,
        required: true
    },
    sub_c_image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
}, {
    timestamps: true
});

const subCategoryModel = mongoose.model('subcategory', subCategorySchema);
export default subCategoryModel;
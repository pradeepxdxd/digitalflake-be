import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    p_name: {
        type: String,
        required: true
    },
    c_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    sub_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategory',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const productModel = mongoose.model('product', productSchema);
export default productModel;
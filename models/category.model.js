import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: true
    },
    c_image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model('category', categorySchema);
export default categoryModel;
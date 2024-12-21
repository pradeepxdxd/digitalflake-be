import { addProductService, getProductByIdService, editProductService, deleteProductService, getAllProductService } from "../services/product.service.js";

export const addProduct = async (req, res) => await addProductService(req, res);
export const getProductById = async (req, res) => await getProductByIdService(req, res);
export const editProduct = async (req, res) => await editProductService(req, res);
export const deleteProduct = async (req, res) => await deleteProductService(req, res);
export const getAllProduct = async (req, res) => await getAllProductService(req, res);
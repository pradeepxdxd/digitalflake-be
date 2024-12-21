import { addAdminService, getAdminService, loginService, forgetPasswordService, resetPasswordService } from "../services/admin.service.js";

export const addAdmin = async (req, res) => await addAdminService(req, res);
export const login = async (req, res) => await loginService(req, res);
export const getAdmin = async (req, res) => await getAdminService(req, res);
export const forgetPassword = async (req, res) => await forgetPasswordService(req, res);
export const resetPassword = async (req, res) => await resetPasswordService(req, res);
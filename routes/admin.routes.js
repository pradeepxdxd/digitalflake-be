import express from 'express'
import { addAdmin, getAdmin, login, forgetPassword, resetPassword } from '../controllers/admin.js';
import auth from '../middlewares/auth.js';

const route = express.Router();

route.post('/', addAdmin);
route.post('/login', login);
route.get('/:id', auth, getAdmin);
route.post('/forget-password', forgetPassword);
route.post('/reset-password', auth, resetPassword);

export default route;
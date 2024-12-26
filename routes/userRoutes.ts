import express from 'express';
import { validateToken } from '../middleware/authMiddleware';
import { fetchUserData, updateUserData } from '../controller/api';

const router = express.Router();

router.put(
  '/update-user-data', 
  validateToken(), 
  updateUserData
);

router.get(
  '/fetch-user-data', 
  validateToken(), 
  fetchUserData
);

export default router;
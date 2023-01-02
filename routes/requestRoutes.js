import express from 'express';
import { getRequests, postRequest } from '../controller/requests.js';
const router = express.Router();

router.get('/', getRequests);
router.post('/', postRequest);

export default router
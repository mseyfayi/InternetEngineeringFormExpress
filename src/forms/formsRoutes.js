import express from 'express';
import {get, post} from "./formsController";

const router = express.Router();
const url = '/forms';

router.post(url, post);

router.get(url, get);

export default router;
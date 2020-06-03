import express from 'express';
import {get, getById, post} from "./formsController";

const router = express.Router();
const url = '/forms';

router.post(url, post);

router.get(url, get);

router.get(`${url}/:id`, getById);

export default router;

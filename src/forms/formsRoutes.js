import express from 'express';
import {get, getById, post, postById} from "./formsController";

const router = express.Router();
const url = '/forms';

router.post(url, post);

router.get(url, get);

router.get(`${url}/:id`, getById);

router.post(`${url}/:id`, postById);

export default router;

import express from 'express';

const router = express.Router();
const url = '/forms';

router.post(url, (req, res) => {
    res.sendStatus(200)
});

router.get(url, (req, res) => {
    res.sendStatus(200)
});

export default router;
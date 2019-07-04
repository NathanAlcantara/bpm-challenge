import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).send({
        "message": "It's Working bro!"
    });
});

export default router;
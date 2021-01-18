import * as express from 'express';
import db from "./db";

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
    res.json('World');
});

router.get('/api/chirps', async (rec, res) => {
    try {
        res.json(await db.chirps.all());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.chirps.single(id))[0]);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
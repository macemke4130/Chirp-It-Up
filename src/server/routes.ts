import * as express from 'express';
import db from "./db";

const router = express.Router();

router.get('/api/chirps', async (req, res) => {
    try {
        res.json(await db.chirps.all());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/users', async (req, res) => {
    try {
        res.json(await db.chirps.users());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.chirps.single(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps/permalink/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json((await db.chirps.permalink(id))[0]);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/api/chirps/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        res.json(await db.chirps.destroy(id));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/chirps/new', async (req, res) => {
    try {
        let userid = req.body.userid;
        let content = req.body.content;
        let location = req.body.location;
        let toMySQL: any = await db.chirps.newPost(userid, content, location);
        res.json(toMySQL);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/api/chirps/mentions/:id', async (req, res) => {
    let id: number = Number(req.params.id);
    try {
        let toMySQL: any = await db.chirps.allMentions(id);
        res.json(toMySQL);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/api/chirps/mention', async (req, res) => {
    try {
        let mention = req.body;
        let insertMention: any = await db.chirps.mention(mention.userId, mention.chirpId);
        res.json(insertMention);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/api/chirps/:id', async (req, res) => {
    try {
        let id = Number(req.params.id);
        let userid = req.body.userid;
        let content = req.body.content;
        let location = req.body.location;

        res.json(await db.chirps.put(id, userid, content, location));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

export default router;
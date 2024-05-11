
import {db} from "../server";
const express = require('express');
const router = express.Router();



router.post('/', (req:any, res:any) => {
    const { user, message, matiereId } = req.body; 
    const sql = 'INSERT INTO message (id_user, message,timestamp,id_matiere) VALUES (?, ?, NOW(),?)'; 
    db.query(sql, [user, message, matiereId], (err:any, result:any) => {
        if (err) throw err;
        res.send('Message enregistré dans la base de données');
    });
});

router.get('/', (req:any, res:any) => {
    const idmat=req.query.mat;
    const lastUpdateTimestamp = req.query.lastUpdateTimestamp || 0;
    const sql = 'SELECT * FROM message WHERE timestamp > ? and id_matiere=?';
    db.query(sql, [lastUpdateTimestamp,idmat], (err:any, result:any) => {
        if (err) throw err;
        res.json(result);
    });
});

router.get("/all", (req: any, res: any) => {
    let sql ='SELECT m.id_user,m.message, u.fullname FROM message m JOIN users u ON m.id_user = u.id';
    db.query(sql, (err: any, result: any) => {
        if (err) throw err;
        res.json(result);
    });
});


export default router;
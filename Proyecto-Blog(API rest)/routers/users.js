const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../database/config')


const PRIVATE_KEY = 'micl4v3s3cr3t4'

router.post('/login', async (req, res)=>{
    const {username, password} = req.body;

    const query = await db.query("SELECT * FROM users WHERE username = ?",
        {replacements: [username], type: db.QueryTypes.SELECT}    
    )

    const user = query[0];

    if(user){
        const checkPassword = bcrypt.compareSync(password, user.password);

        if(checkPassword){
            delete user.password;
            const token = jwt.sign(user, PRIVATE_KEY);
            res.send(token)
        } else{
            res.send('Contraseña incorrecta')
        }
    } else {
        res.send('Usuario incorrecto')
    }
    

})

router.post('/register', async (req, res)=>{
    let {username, password, email, address, role } = req.body;
    const deleted = false;
    password = await bcrypt.hash(password, 0);

    const result = await db.query(
        'INSERT INTO users (username, password, email, address, role, deleted) VALUES (?, ?, ? ,?, ?, ?)',
        {replacements: [username, password, email, address, role, deleted]}
    )

    res.send(result);
})

module.exports = router;
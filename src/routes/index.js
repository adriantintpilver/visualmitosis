const { Router } = require('express');
const sqlite3=require('sqlite3').verbose();
const path = require('path');
const { unlink } = require('fs-extra');
const router = Router();

// Models
//require('../database');

// Base de Datos
const db_name=path.join("src/","db","base.db");
const db=new sqlite3.Database(db_name,err =>{
    if(err) {
        return console.error(err.message);
        console.log("Error DB");
    }else{
        console.log("Connection DB OK!")
    }
})
const { Console } = require('console');

router.get('/', async (req, res) => {
    const { find } = "";
    console.log("entro");
    const sql="SELECT * FROM mitosis ORDER BY title";
    db.all(sql, [], (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("index",{modelo:rows, find});
        }
    })
})
router.get('/find', async (req, res) => {
    const { find } = "";
    const sql="SELECT * FROM mitosis ORDER BY title";
    db.all(sql, [], (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("index",{modelo:rows, find});
        }
    })
});

router.post('/find', async (req, res) => {
    const find = req.body.search;
    const sql="SELECT * FROM mitosis where title LIKE '%"+find+"%' or description LIKE '%"+find+"%' ORDER BY title";
    db.all(sql, [], (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("search",{modelo:rows, find});
        }
    })
});

router.get('/find/:find', async (req, res) => {
    const { find } = req.params;
    const sql="SELECT * FROM mitosis where title LIKE '%"+find+"%' or description LIKE '%"+find+"%' ORDER BY title";
    db.all(sql, [], (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("search",{modelo:rows, find});
        }
    })
});

router.get('/upload', async function (req, res) {
    const { find } = req.params;
    res.render('upload',{ find });
});

// POST /upload
router.post('/upload', async (req, res) => {
    const sql="INSERT INTO mitosis (title, description, copyright_link, copyright_name, video_type, video_id, filename, path, originalname, mimetype, size) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const new_mitosis=[req.body.title, req.body.description, req.body.copyright_link, req.body.copyright_name, req.body.video_type, req.body.video_id, req.file.filename, '/img/uploads/' + req.file.filename, req.file.originalname, req.file.mimetype, req.file.size];    
    console.log (new_mitosis);
    db.run(sql, new_mitosis, err => {
        if (err){
            return console.error(err.message);
        }else{
            res.redirect("/");
        }
    });
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const find = "";
    const sql="SELECT * FROM mitosis where mitosis_ID = ?";
    db.all(sql, id, (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("profile",{modelo:rows, find});
        }
    })
});

router.get('/image/:id/:find', async (req, res) => {
    const id = req.params.id;
    const find = req.params.find;
    const sql="SELECT * FROM mitosis where mitosis_ID = ?";
    db.all(sql, id, (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("profile",{modelo:rows, find});
        }
    })
});

router.get('/image/:id/delete/ok', async (req, res) => {
    const sql="DELETE FROM mitosis WHERE mitosis_ID = ?";
    const del_mitosis=[req.params.id];
    db.run(sql, del_mitosis, err => {
        if (err){
            return console.error(err.message);
        }else{
            res.redirect("/");
        }
    });
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const find = "";
    const sql="SELECT * FROM mitosis where mitosis_ID = ?";
    db.all(sql, id, (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("edit",{modelo:rows, find});
        }
    })
});

router.get('/edit/:id/:find', async (req, res) => {
    const { id } = req.params;
    const find = req.params.find;
    const sql="SELECT * FROM mitosis where mitosis_ID = ?";
    db.all(sql, id, (err, rows)=>{
        if (err){
            return console.error(err.message);
        }else{
            res.render("edit",{modelo:rows, find});
        }
    })
});

router.post('/edit', async (req, res) => {
    console.log(req.file);
    if(req.file) {
        const sql="UPDATE mitosis SET filename = ?, path = ?, originalname = ?, mimetype = ?, size = ? WHERE mitosis_ID = ?";
        const edit_mitosis=[req.file.filename, '/img/uploads/' + req.file.filename, req.file.originalname, req.file.mimetype, req.file.size, req.body.id];
        db.run(sql, edit_mitosis, err => {
            if (err){
                return console.error(err.message);
            }
        });
    } 
    const sql="UPDATE mitosis SET title = ?, description = ?, copyright_link = ?, copyright_name = ?, video_type = ?, video_id = ? WHERE mitosis_ID = ?";
    const edit_mitosis=[req.body.title, req.body.description, req.body.copyright_link, req.body.copyright_name, req.body.video_type, req.body.video_id, req.body.id];
    db.run(sql, edit_mitosis, err => {
        if (err){
            return console.error(err.message);
        }else{
            res.redirect("/");
        }
    });
});

module.exports = router;



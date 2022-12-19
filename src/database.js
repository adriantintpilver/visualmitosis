const sqlite3=require('sqlite3').verbose();
const path=require('path');
// Base de Datos
const db_name=path.join(__dirname,"db","base.db");
const db=new sqlite3.Database(db_name,err =>{
    if(err) {
        return console.error(err.message);
    }else{
        console.log("DB conection OK")
    }
}) 
// Crear las tablas
const sql_create="CREATE TABLE IF NOT EXISTS mitosis (mitosis_ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title VARCHAR(100) NOT NULL, description TEXT, filename VARCHAR(200) , path VARCHAR(100), originalname VARCHAR(200), copyright_name VARCHAR(100), copyright_link VARCHAR(200), video_type INTEGER, video_id VARCHAR(200), mimetype VARCHAR(200), size INTEGER)";  
db.run(sql_create, err => {
    if(err) {
        return console.error(err.message);
    }else{
        console.log("mitosis table created OK")
    }
})

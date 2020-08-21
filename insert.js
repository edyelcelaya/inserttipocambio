const mariadb = require('mariadb');
const express = require('express');
const app = express();  
const bodyParser=require('body-parser');

const pool = mariadb.createPool({
     host: process.env.DB_HOST || 'localhost', 
     user: process.env.DB_USER || 'admin', 
     password: process.env.DB_PASS || 'admin123',
     database: process.env.DB_NAME || 'tipocambio',
     connectionLimit: 5});

     const port=process.env.SERVERPORT || '4170'
     const serverip=process.env.SERVERIP ||'0.0.0.0';
     
     app.use(bodyParser.urlencoded({extended: true}));
     app.use(bodyParser.json());
     
     app.post('/inserttipocambio',async function asyncFunction(req, res) {
       let conn;
       let valores = req.body;
       try {
  
         conn = await pool.getConnection();
         
         const rows = await conn.query(`insert into tipocambio.historico values ('${valores.id}','${valores.fecha}','${valores.monto}')`);
         res.json(rows);
         conn.release();
      
       } catch (err) {
         throw err;
         res.json(err);
         conn.release();
       } 
     });
     
     app.listen(port, serverip, function(req, res){
         console.log('El servidor escucha por el puerto:', port)
     })



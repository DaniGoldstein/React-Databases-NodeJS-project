const mysql =require ('mysql2/promise');

const pool =mysql.createPool({
host: 'localhost',
user: 'root',
database:'world',
password:'1234',

});

async function getDb(){
const db = await pool.query(`SELECT * FROM city`)
console.log(db);
}

getDb();
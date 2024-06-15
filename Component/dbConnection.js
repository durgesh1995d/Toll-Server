const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database: 'tollplaza'
});
connection.connect((err)=>{
    if(err){
        console.log("local= sql error===>",err)
    }else {
        console.log("data===sql Connectioned")
    }
});

module.exports=connection;

 
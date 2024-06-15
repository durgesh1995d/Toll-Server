const { v4: uuid } = require('uuid');
const connection = require('../Component/dbConnection');
const errorlog = require('../Component/errorCom');

const register = (req,res)=>{
    const data=req.body
    connection.query('INSERT INTO test SET ?',data,(err, results)=>{
        let requestIds=uuid();
        if(err){
            const mydate={
                requestID:requestIds,
                status:200,
                msg:"Something went wrong",
                data:[]
            }
            errorlog.logger.error({
                type:"Error",
                requestID:requestIds,
                msg:"Something went wrong",
                error:err
            })
            res.send(mydate)
    
        }else{
            const mydate={
                requestID:requestIds,
                status:200,
                msg:"success",
                data:results

            }
        res.send(mydate)
        }
    })
}

module.exports={
    register
}
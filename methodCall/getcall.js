const { v4: uuid } = require('uuid');
const connection = require('../Component/dbConnection');
const errorlog = require('../Component/errorCom');
const jwt = require('jsonwebtoken');


const user = (req, res) => {
    connection.query('Select * from test', (err, results) => {
        let requestIds = uuid();
        if (err) {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "Something went wrong",
                data: err
            }
            errorlog.logger.error({
                type: "Error",
                requestID: requestIds,
                msg: "Something went wrong",
                error: err
            })
            res.send(mydate)
        }
        else {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "Email or password are wrong",
                data: results

            }
            res.send(mydate)
        }

    }
    )
}

const register = (req, res) => {
    const data = req.body
    connection.query('INSERT INTO test SET ?', data, (err, results) => {
        let requestIds = uuid();
        if (err) {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "Something went wrong",
                data: []
            }
            errorlog.logger.error({
                type: "Error",
                requestID: requestIds,
                msg: "Something went wrong",
                error: err
            })
            res.send(mydate)

        } else {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "success",
                data: results

            }
            res.send(mydate)
        }
    })
}

const login = (req, res) => {
    const data = req.body
    console.log("faaya====", connection.escape(req.body.email))
    connection.query(`SELECT * FROM test WHERE email= ${connection.escape(req.body.email)}`, (err, results) => {
        let requestIds = uuid();
        if (err) {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "Email or Password are wrong",
                data: []
            }
            errorlog.logger.error({
                type: "Error",
                requestID: requestIds,
                msg: "Email or Password are wrong",
                error: err
            })
            res.send(mydate)

        }
        else if (results.length == 0) {
            const mydate = {
                requestID: requestIds,
                status: 200,
                msg: "Email or Password is incorrect",
            }
            res.send(mydate)
        }
        else {
            // console.log("data ===Status==>",results?.[0].password.toString(), req.body.password.toString(), results?.[0].password.toString().localeCompare(req.body.password.toString()))
            if (!(results?.[0].password.toString()).localeCompare(req.body.password.toString())) {
                const token = jwt.sign({ id: results[0]['id'] }, "Foot", { expiresIn: '1h' })
                const mydate = {
                    requestID: requestIds,
                    status: 200,
                    msg: "Login Successfully",
                    data: results,
                    tokens: token

                }
                res.send(mydate)
            }
            else {
                const mydate = {
                    requestID: requestIds,
                    status: 200,
                    msg: "Invalid password",
                    // data: results

                }
                res.send(mydate)
            }
        }
    })
}

const profile = (req, res) => {
    const authToken = req.headers.authorization.split(' ')[1];
    console.log("authData====>", req.headers.authorization.split(' ')?.[1])
    console.log("authData====>", authToken)
    
    const token = jwt.verify(authToken, "Foot")
    console.log("token====>", token)
    res.send({ result: token })
}

const logout = (req, res) => {
    const authToken = req.headers.authorization.split(' ')[1];
    console.log("authData====>", req.headers.authorization.split(' ')?.[1])
    console.log("authData====>", authToken)
    
    const token = jwt.TokenExpiredError(authToken, "Foot")
    res.send({ result: token })
    console.log("logout SuccessFully", token)

}



module.exports = {
    user,
    register,
    login,
    profile,
    logout
}
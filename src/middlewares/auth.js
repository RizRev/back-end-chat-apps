// const { verify } = require("../helpers/jwt");
// const { response } = require("./common");
// const createError = require("http-errors");

// module.exports.protect = async (req, res, next) => {
//   try {
//     console.log("sudah masuk sini")
//     console.log(req.headers);
//     if (
//       req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer")
//     ) {
//       let token = req.headers.authorization.split(" ")[1];
//       console.log(token);
//       const payload = await verify(token);
//       console.log(payload);
//       req.payload = payload;
//       next();
//     } else {
//       response(res, [], 200, "SERVER NEED TOKEN");
//     }
//   } catch (error) {
//     if (error && error.name === "JsonWebTokenError") {
//       next(createError(400, "token invalid"));
//     } else if (error && error.name === "TokenExpiredError") {
//       next(createError(400, "token expired"));
//     } else {
//       next(createError(400, "Token not active"));
//     }
//   }
// };

const {response} = require('../helper/common')
const jwt = require('jsonwebtoken')
let key = "caffeine"

const role = (req,res,next) => {
    if(req.params.role == 'toko' || req.params.role == 'pengunjung' ){
        return next()
    }
    return response(res, 404, false, null,"wrong role users")
}

const roleToko = (req,res,next) => {
    if(req.payload.role == 'toko'){
        return next()
    }
    return response(res, 404, false, null,"wrong role users")
}

const protect = (req,res,next) => {
    try{
        let token
        if(req.headers.authorization){
            let auth = req.headers.authorization
            token = auth.split(" ")[1]
            let decode = jwt.verify(token,key)
            req.payload = decode
            next()
        } else {
            return response(res, 404, false, null,"server need token")
        }
    } catch(err) {
        console.log(err) 
        if(err && err.name == 'JsonWebTokenError'){
            return response(res, 404, false, null,"invalid token")
        } else if (err && err.name == 'TokenExpriredError'){
            return response(res, 404, false, null,"expired token")
        } else {
            return response(res, 404, false, null,"token not active")
        }
    }
}
// module.exports = {role}
module.exports = {role,protect,roleToko}

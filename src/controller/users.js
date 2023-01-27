const Modelusers = require("../model/users");
const { response }= require("../helper/common")
const { generateToken } = require("../helper/jwt");
const { v4: uuidv4 } = require("uuid")
const bcrypt = require("bcryptjs")
const email = require("../middlewares/email")
const Host = process.env.HOST;
const Port = process.env.PORT;

const usersController = {
    insert: async (req, res, next) => {
      let {
        rows: [users],
      } = await Modelusers.findEmail(req.body.email);
      if (users) {
        return response(res, 404, false, "email already use", "register fail");
      }
      let digits = "0123456789";
      let otp = "";
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
  
      let salt = bcrypt.genSaltSync(10);
      let password = bcrypt.hashSync(req.body.password);
      //   let password1 = req.body.password;
      //   let confirm = req.body.confirm;
  
      let data = {
        id: uuidv4(),
        email: req.body.email,
        password,
        fullname: req.body.fullname,
        // phonenumber: req.body.phonenumber,
        // confirm,
        // status: req.body.auth,
        otp
      };
      //   if (password1 !== confirm)
      //     return response(res, 417, false, null, "password tidak sesuai");
      try {
        const result = await Modelusers.createUsers(data);
        if (result) {
          console.log(result);
          let verifUrl = `http://localhost:4000/users/verification/${req.body.email}/${otp}`;
          let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
          if (sendEmail == "email not sent!") {
            return response(res, 404, false, null, "register fail");
          } 
          response(
            res,
            200,
            true,
            { email: data.email },
            "register success please check your email"
          );
        }
      } catch (err) {
        console.log(err);
        response(res, 404, false, err, "register fail");
      }
    },
    otp: async (req, res, next) => {
      console.log("email", req.body.email);
      console.log("otp", req.body.otp);
      let {
        rows: [users],
      } = await Modelusers.findEmail(req.body.email);
      if (!users) {
        return response(res, 404, false, null, " email not found");
      }
      if (users.otp == req.body.otp) {
        const result = await Modelusers.verification(req.body.email);
        return response(
          res,
          200,
          true,
          result.command,
          " verification email success"
        );
      }
      return response(
        res,
        404,
        false,
        null,
        " wrong otp please check your email"
      );
    },
    login: async (req, res, next) => {
      console.log("email", req.body.email);
      console.log("password", req.body.password);
      let {
        rows: [users],
      } = await Modelusers.findEmail(req.body.email);
      if (!users) {
        return response(res, 404, false, null, "login gagal email salah");
      }
      const password = req.body.password;
      const validation = bcrypt.compareSync(password, users.password);
  
      if (!validation) {
        return response(res, 404, false, null, "login gagal password salah");
      }
      if (users.status == 0) {
        return response(res, 402, false, null, "belum verif");
      }
  
      delete users.password;
  
      let payload = {
        email: users.email,
        id: users.id
      };
      users.token = generateToken(payload);
      response(res, 200, true, users, "login berhasil");
    },
    verif: async (req, res) => {
      const { email, otp } = req.params;
      const {
        rows: [users],
      } = await Modelusers.findEmail(email);
      if (!users) {
        return response(res, 404, false, null, "email not found");
      }
  
      if (users.otp == otp) {
        await Modelusers.verification(email);
        return response(
          res,
          200,
          true,
          req.body.email,
          "verification account success"
        );
      }
      return response(res, 404, false, null, "wrong otp please check your email");
    },
    profile: async (req, res, next) => {
      const { email } = req.payload;
      console.log("sudah masuk controller")
  
      try {
        const {
          rows: [users],
        } = await Modelusers.findEmail(email);
  
        if (users === undefined) {
          res.json({
            message: "invalid token",
          });
          return;
        }
  
        delete users.password;
        response(res, 200, true, users, "get data success");
      } catch (error) {
        console.log(error);
        response(res, 404, false, "get data fail");
      }
    },getAll: async(req,res,next) => {
      try{
        const result =await Modelusers.allUser();
        response(res, 200, true, result.rows, "get all user success")
      } catch(err) {
        response(res, 404, false, "get all data fail")
      }
    }
}

exports.usersController = usersController;

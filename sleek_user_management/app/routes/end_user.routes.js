const controller = require("../controllers/end_user.controller");
const path = require("path");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: "./public/EndUserImage",
  filename: function (req, file, fn) {
    fn(
      null,
      new Date().getTime().toString() + "-" + 
      file.fieldname + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storageFile }).single("end_UserImage");

module.exports = function (app, passport) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.post("/api/auth/usersignup", upload, controller.validate('createUser'), controller.signup);
  app.post("/api/auth/createdealer", upload, controller.validate('createUser'), controller.create);
  app.post("/api/auth/enduserverifycode", controller.VerifyCode);
  app.post("/api/auth/endusercheckmail", controller.CheckUserEmail);
  app.post("/api/auth/enduserlogin", controller.signin);
  app.get("/api/auth/enduserloggedin", controller.loggedIn);

  //Google Authentication
  app.post("/api/auth/googleSignIn", controller.validate('socialUser'), controller.googleSignIn);
  app.post("/api/auth/facebookSignIn", controller.validate('socialUser'), controller.facebookSignIn);

 //EndUser APIs
  app.get("/api/endusr/enduserlogout", controller.logout);
  app.put("/api/endusr/updateenduser/:id",upload, controller.validate('updateUser'), controller.update);
  app.get("/api/endusr/getenduser", controller.findOneUser);
 
  //Admin APIs
  app.get("/api/usr/allendusers", controller.findAll);
  app.get("/api/usr/activeendusers", controller.findActive);
  app.get("/api/usr/catendusers/:id", controller.findAllByCat);
  app.get("/api/usr/extractenduser/:id", controller.findOne);
  app.delete("/api/usr/deleteenduser/:id", controller.delete);
};
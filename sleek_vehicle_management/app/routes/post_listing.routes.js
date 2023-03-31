const controller = require("../controllers/post_listing.controller");
const path = require("path");
const multer = require("multer");

const storageFile = multer.diskStorage({
  destination: "./public/ListingImages",
  filename: function (req, file, fn) {
    fn(null, new Date().getTime().toString() + "-" +  file.fieldname + path.extname(file.originalname));
  },
});

var upload = multer({ storage: storageFile }).array("post_listing_image", 10);

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Web APIs
  app.get("/api/vce/view/approvedPostListing", controller.UpdatePost);
  app.get("/api/vce/view/findAllPost", controller.findAllPost);
  app.get("/api/vce/view/findPost/:postid", controller.findSinglePost);


  //EndUser APIs
  app.post("/api/vce/endusr/addPostListing",upload, controller.create);
  app.get("/api/vce/endusr/pendingPostListing", controller.findUserPending);
  app.get("/api/vce/endusr/userPosts", controller.findUserPosts);
  app.get("/api/vce/newsfeed/postnewsfeed", controller.PostListingUsers);
  app.get("/api/vce/endusr/makerPost", controller.PostListingMaker);
  app.get("/api/vce/endusr/similarPosts", controller.SimilarPostListing);
  app.post("/api/vce/endusr/filteredPosts", controller.FilterPostListing);
  app.post("/api/vce/endusr/searchpost", controller.SearchPostListing);
  
  //Admin APIs
  // app.get("/api/vce/usr/allpostlisting", controller.findAll);
};

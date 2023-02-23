const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/editprofile");
  }
  res.render("login", {
    title: "Login",
  });
}



exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
   return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });
 
  

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
     res.redirect(req.session.returnTo || "/profile");
    });
  })
  
  
  (req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

/*exports.getForgotPassword = async (req, res) => {
 const validation = []
 if(!validator.isEmail(req.body.email))
 validation.push({ msg: "Please enter a valid email address." });
 
}*/

exports.postForgotPassword = async ({body: { email }  }, res) => {
  const user = await User.findOne({ email })

  if (!user)
  return res.status(404).json({message:"Email does not exist.", status:"error" })

  const generatedToken = crypto.randomBytes(32)

  if(!generatedToken){
    return res.status(500).json({
      message: "An error occured. Please try again later.",
      status:"error"
    })
  }


const convertTokenToHexString = generatedToken.toString("hex");

user.resetToken = convertTokenToHexString;
user.expireToken = Date.now() + 1800000

try {
  const saveToken = await User.save()
  return res.status(200).json({
    message: "Add User Url that handles rest password",
    data: {
      resetToken: saveToken.resetToken,
      expireToken: saveToken.expireToken,
    },
    status: "success",
  })
} catch (err) {
  return res.status(500).json({
    status: "false",
    message:  `An error occured while trying to save the token ${err.message}`,
  })
}


}



exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/editprofile");
        });
      });
    }
  );
};



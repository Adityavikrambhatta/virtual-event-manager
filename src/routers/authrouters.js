const bcrypt = require("bcrypt");
const path = require("path");
const User = require(path.join("..", "models", "User.js"));
const jwt = require("jsonwebtoken");
var signUp = (req, res) => {
  const user = User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: req.body.role ? req.body.role : "participant",
  });
  user
    .save()
    .then((data) => {
      return res
        .status(200)
        .json({ user: data, message: "User created successfully." });
    })
    .catch((err) => {
      return res.status(400).send({ message: err });
    });

};
var login = (req, res) => {
  var emailPassed = req.body.email;
  let passwordPassed = req.body.password;
  
  User.findOne({
    email: emailPassed,
  })
    .then((user) => {
        
      if (!user) {
        return res.status(400).send({ message: "User not found" });
      }
      let passwordIsValid = bcrypt.compareSync(passwordPassed, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password" });
      } else {
     
            console.log("API_SECRET:", process.env.API_SECRET);
            var token = jwt.sign(
                {
                  id: user.id,
                }, process.env.API_SECRET,{
                  expiresIn: 86400,
                }
              );
    
        return res.status(200).json({
          message: "Login Successful",
          token: token,
          user: {
            id: user.id,
          },
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
};

module.exports = { signUp, login };

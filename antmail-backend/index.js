const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
require("dotenv").config();

const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const CONNECTION_URL =
  "mongodb+srv://prem:prem123@cluster0.vqb1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// const CONNECTION_URL="mongodb://localhost:27017/antmailDB"
const Port = process.env.PORT || 3001;
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static());
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve("../", "build", "index.html"));
//   });
// }

let flag = false;

const mailSchema = new mongoose.Schema({
  email: String,
  to: [String],
  cc: String,
  sub: String,
  schedulerSelector: {
    type: String,
    default: "0 0 0 0 0 0",
  },
  mailBody: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  sentAt: {
    type: Date,
    default: new Date(),
  },
});

const emailMessage = mongoose.model("emailMessage", mailSchema);

const userSchema = new mongoose.Schema({
  email: String,
  userName: String,
});

let newPost = {};
let key = {};

const user = mongoose.model("user", userSchema);

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(Port, () => {
  console.log(`api server runs in 3001 `);
});

app.get("/posts", async (req, res) => {
  const userMessage = await user.find();
  console.log(userMessage, "hai");
});

app.post("/signin/auth", async (req, res) => {
  key = req.body;
  user.findOne({ email: req.body.email }, async (err, respond) => {
    if (!err) {
      if (respond) {
        res.send("account already exists");
        console.log(respond);
      } else {
        newPost = new user({
          email: req.body.email,
          userName: req.body.userName,
        });
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: req.body.email,
            pass: req.body.password,
          },
        });
        transporter.verify(function (error, success) {
          if (error) {
            console.log(
              error,
              newPost,
              "https://www.google.com/settings/security/lesssecureapps"
            );

            res.send("incorrect password");
          } else {
            console.log("Server is ready to take our messages");
            newPost.save();
            flag = true;
            res.send(newPost);
          }
        });
      }
    } else {
    }
  });
});

app.post("/login/auth", async (req, res) => {
  key = req.body;
  await user.findOne({ userName: req.body.userName }, async (err, respond) => {
    if (!err) {
      newPost = respond;
      if (respond) {
        const transporter = await nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: respond.email,
            pass: req.body.password,
          },
        });

        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
            res.send("incorrect password");
          } else {
            console.log("Login: Server is ready to take our messages");
            res.send(respond);
            flag = true;
          }
        });
      } else {
        res.send("account not found");
      }
    } else {
      res.send(err);
    }
  });
});

app.post("/posts/message", async (req, res) => {
  const post = req.body;
  if (flag) {
    const Post = await new emailMessage({
      email: post.email,
      to: post.to,
      cc: post.cc,
      sub: post.sub,
      schedulerSelector: post.schedulerSelector,
      mailBody: post.mailBody,
      createdAt: new Date(),
      sentAt: new Date(),
    });

    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      service: "gmail",
      auth: {
        user: post.email,
        pass: key.password,
      },
    });

    let time = post.schedulerSelector;
    console.log(time);
    // console.log(transporter);
    if (time !== "0 0 0 0 0 0") {
      cron.schedule(time, async () => {
        transporter.sendMail(send(post), function (error, info) {
          if (!error) {
            let Post = new emailMessage({
              email: post.email,
              to: post.to,
              cc: post.cc,
              sub: post.sub,
              schedulerSelector: post.schedulerSelector,
              mailBody: post.mailBody,
              createdAt: new Date(),
              sentAt: new Date(),
            });
            console.log("sent");
            Post.save();
          } else {
            console.log(error, "mailnot sent ", send(post), newPost, post);
          }
        });
      });
    } else {
      transporter.sendMail(send(post), async function (error, info) {
        if (!error) {
          Post = await new emailMessage({
            email: post.email,
            to: post.to,
            cc: post.cc,
            sub: post.sub,
            schedulerSelector: post.schedulerSelector,
            mailBody: post.mailBody,
            createdAt: new Date(),
            sentAt: new Date(),
          });

          Post.save();
        } else {
          console.log(error, "mailnot sent ", send(post), newPost, post);
        }
      });
    }
  } else {
    console.log("authorization failed");
    res.send("Authorization failed");
  }
});
function send(post) {
  return {
    from: post.email, // sender address
    to: post.to, // list of receivers
    subject: post.sub, // Subject line
    text: post.mailBody, // plain text body
  };
}

app.get("/posts/history", (req, res) => {
  if (flag) {
    emailMessage.find({ email: newPost.email }, (error, respond) => {
      if (respond) {
        res.send(respond);
      } else {
        res.send("no history");
      }
    });
  } else {
    console.log("history: authentication failed");
  }
});

app.post("/posts/singleHistory", (req, res) => {
  emailMessage.find({ _id: req.body.userId }, (error, respond) => {
    if (respond) {
      res.send(respond);
      console.log(respond, req);
    } else {
      res.send("no history");
    }
  });
});

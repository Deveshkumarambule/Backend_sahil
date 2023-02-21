const { IssueModel, UserModel, CounterModel } = require("./ticket_database");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const axios = require("axios");
const Imap = require("imap");
const { simpleParser } = require("mailparser");

const imapConfig = {
  user: "sahil.range@tech-trail.com",
  password: "ogxkmmoptovbioip",
  host: "imap.gmail.com",
  port: 993,
  tls: true,
};
getOrAddUserIdByEmail = async (emailid) => {
  try {
    const findUser = await UserModel.findOne({ email: emailid });
    if (findUser) {
      console.log("User ID :: ", findUser._id);
      // user_id = findUser._id;
      return findUser._id;
    } else {
      try {
        const data = new UserModel({
          email: emailid,
        });
        console.log();
        const new_user = await data.save();
        console.log(new_user + "-------new user");
        // console.log(new_user, "============result=============");
        if (!new_user || new_user == null || new_user == "") {
          return res.json({
            status: false,
            message: "User Not Added ",
            errorCode: 401,
          });
        } else {
          return {
            status: true,
            message: "User Added Successfully",
            user: new_user,
          };
        }
      } catch (error) {
        console.log(error);
      }
      // return 0;
    }
  } catch (error) {
    console.log(error);
    // return 0;
  }
};

const imap = new Imap(imapConfig);
imap.once("ready", () => {
  imap.openBox("INBOX", false, () => {
    imap.on("mail", (numNewMsgs) => {
      console.log(`New messages received: ${numNewMsgs}`);
      imap.search(["UNSEEN"], (err, results) => {
        const f = imap.fetch("*", {
          bodies: "",
        });

        f.on("message", (msg) => {
          msg.on("body", (stream) => {
            simpleParser(stream, async (err, parsed) => {
              emailid = parsed.from.value[0].address;
              email_issue_title = parsed.subject;
              email_issue_summery = parsed.text
                .replace(/(\r\n|\n|\r)/gm, "")
                .replace(/<\/div>/gi, "\n")
                .replace(/<\/li>/gi, "\n")
                .replace(/<li>/gi, "  *  ")
                .replace(/<\/ul>/gi, "\n")
                .replace(/<\/p>/gi, "\n")
                .replace(/<br\/?>/gi, "\n")
                .replace(/<[<^>t]+>/gi, "")
                .replace(/\.(?![^@]+$)/g, "");
              console.log("emailid----" + emailid);
              const findUser = await UserModel.findOne({ email: emailid });
              console.log(findUser + "-------");
              const newUser = await UserModel.findOne({ email: emailid });
              console.log(newUser + "-----");
              if (!newUser) {
                try {
                  const data = new UserModel({
                    email: emailid,
                  });
                  // console.log(data);
                  const new_user = await data.save();
                  // console.log(new_user + "-------new user");
                } catch (error) {
                  console.log(error);
                }
              }
              axios
                .post("http://localhost:7002/Issue/newissue", {
                  issue_title: email_issue_title,
                  issue_summery: email_issue_summery,
                  user_ID: findUser._id || new_user._id,
                  updatedAt: Date.now(),
                })
                .then((response) => {
                  console.log(response.data);
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          });
          msg.once("attributes", (attrs) => {
            const { uid } = attrs;
            imap.addFlags(uid, ["\\Seen"], () => {
              console.log("Marked as read!");
            });
          });
        });
        f.once("error", (ex) => {
          return Promise.reject(ex);
        });
        f.once("end", () => {
          console.log("Done fetching all messages!");
        });
      });
    });
  });
});
imap.once("error", (err) => {
  console.log(err);
});

imap.connect();

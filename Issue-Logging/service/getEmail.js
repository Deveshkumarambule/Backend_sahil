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
const getEmails = () => {
  try {
    const imap = new Imap(imapConfig);
    imap.once("ready", () => {
      imap.openBox("INBOX", true, () => {
        imap.search(["SEEN", ["SINCE", new Date()]], (err, results) => {
          const f = imap.fetch("*", {
            bodies: "",
          });
          f.on("message", (msg) => {
            msg.on("body", (stream) => {
              simpleParser(stream, async (err, parsed) => {
                // let email_details = {
                //   // assigned_to: "sahil.range@tech-trail.com",
                //   emailid: parsed.from.value[0].address,
                //   issue_title: parsed.subject,
                //   issue_summery: parsed.text.replace(/(\r\n|\n|\r)/gm, ""),
                // };
                // console.log("********* emails details ");
                // console.log(email_details);
                // console.log(email_details.emailid + "--------");
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

                axios
                  .post("http://localhost:7002/Issue/newissue", {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // body: {
                    //   assigned_to: "sda"
                    // },
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
            // console.log("Done fetching all messages!");
            imap.end();
          });
        });
      });
    });

    imap.once("error", (err) => {
      console.log(err);
    });

    imap.once("end", () => {
      console.log("Connection ended");
    });

    imap.connect();
  } catch (ex) {
    console.log("an error occurred");
  }
};
module.exports = { getEmails };

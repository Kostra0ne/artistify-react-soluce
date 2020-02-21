/*------------------------------------------
// CONTACT ROUTING
------------------------------------------*/

const express = require("express");
const nodemailer = require("nodemailer");
const router = new express.Router();

router.post("/contact", async (req, res) => {

  console.log(process.env.EMAIL_ADRESS);
  console.log(process.env.EMAIL_PASSWORD);

  

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // If you're using gmail, have a look at https://nodemailer.com/usage/using-gmail/ 
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_ADRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: req.body.from, // sender address
      to: process.env.EMAIL_ADRESS, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: `<p>${req.body.message}</p>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    res.send(info.messageId);
  } catch (err) {
    console.log(err);
    res.status(500).json(dbErr)
  }
});

module.exports = router;

const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  req.email = req.body.email;
  req.name = req.body.name;
  console.log(req.email);

  // Create reusable transporter object using the default SMTP transport
  if (req.method === "POST") {
    console.log(process.env.MAILER_EMAIL);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: "587",
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD,
      },
      secureConnection: "false",
      tls: {
        ciphers: "SSLv3",
      },
    });

    // E-mail content that will be sent to the user to recover password
    const emailContent = {
      from: `"DevBox+", ${ process.env.MAILER_EMAIL }`,
      to: req.email,
      subject: "Recuperação de senha",
      text:
        "Olá " +
        req.name +
        "! Por favor entre neste link abaixo para recuperar sua senha: ",
    };

    // email sending validation
    transporter.sendMail(emailContent, (err, info) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ error: false, message: "Worked!" });
      }
    });
  } else {
    console.log("Now let's PUT");
    // passing the email as a parameter and searching through it
    req.email;
    next();
  }
};

module.exports = { sendEmail };

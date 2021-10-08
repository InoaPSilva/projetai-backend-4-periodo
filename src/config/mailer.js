const nodemailer = require('nodemailer');

const sendEmail = async (req, res, next) => {
    req.email = req.body.email;
    req.name = req.body.name;
    console.log(req.email);

    // Create reusable transporter object using the default SMTP transport
    if (req.method === "POST") {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: '587',
            auth: {
                user: 'dev.box.plus@gmail.com',
                pass: 'devBox123',
            },
            secureConnection: 'false',
            tls: {
                ciphers: 'SSLv3'
            }
        });

        // E-mail content that will be sent to the user to recover password
        const emailContent = {
            from: '"DevBox" dev.box.plus@gmail.com',
            to: req.email,
            subject: 'Recuperação de senha',
            text: 'Olá ' + req.name + ', por favor entre nesse link para recuperar sua senha...'
        }

        transporter.sendMail(emailContent, (err, info) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json({ error: false, message: "Worked!" })
            }
        });
    } else {
        console.log("Now let's PUT");
        req.email;
        next();
    }
};

module.exports = { sendEmail };
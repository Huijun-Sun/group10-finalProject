const nodemailer = require('nodemailer');

       
        const senderEmail = "thyagumoni.yeshu@gmail.com";
        const senderPassword = "Yeshu@0107"; // gmail app password

        module.exports = {
            sendMail: async (toaddress) => {
                try {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                    user: senderEmail,
                    pass: senderPassword,
                    },
                });

                const message = {
                    from: `report sender <${senderEmail}>`,
                    to:toaddress,
                    subject:"Hi deadline of your intrested university is approaching"
                   // text: subject
                   // html: text,
                };

                transporter.sendMail(message, () => {});
                } catch (e) {
                // handle errors here
                throw(e);
                }
            },
        };
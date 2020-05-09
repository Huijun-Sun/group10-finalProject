const nodemailer = require('./node_modules/nodemailer');
       // const defaultMailingList = "example1@vultr.com,example2@vultr.com";
        const senderEmail = "moni0810.selvam@gmail.com";
        const senderPassword = "Yeshu@0107"; // gmail app password
        module.exports = {
            sendMail: async () => {
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
                    to:senderEmail,
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
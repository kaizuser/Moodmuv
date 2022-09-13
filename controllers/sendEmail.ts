const nodemailer = require("nodemailer");

const sendEmail = async (email:string, uniqueString:string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
		user: "thiagochiesa444@gmail.com",
		pass: "flamigera123",
		},
	});

	let sender = "gameover.mindhub@gmail.com";
	let mailOptions = {
		from: sender,
		to: email,
		subject: "Hello, friend! Let's verify your email!",
		html: `<a href='${uniqueString}'></a>`
	}

	await transporter.sendMail(mailOptions, function (error:Error, response:Response) {
		if (error) {
			console.log(error);
		} else {
			console.log("Message sent succesfully");
		}
	});
};

export default sendEmail

const nodemailer = require("nodemailer");

const sendEmail = async (email:string, uniqueString:string, verify:string) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
		user: "thiagochiesa444@gmail.com",
		pass: "ctgpiwkypiuchwsl",
		},
	});

	let sender = "gameover.mindhub@gmail.com";
	let mailOptions = {
		from: sender,
		to: email,
		subject: "Hello, friend! Let's verify your email!",
		html: `<a style="background-color:black;" href='http://localhost:4000/api/auth/${verify}/${uniqueString}'>Sigue este link para verificar tu cuenta</a>`
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

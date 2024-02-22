const nodemailer = require('nodemailer');
require('dotenv').config();
const Meeting = require('../models/MeetingModel');

const Email_Id = process.env.Email_Id;
const Email_Pass = process.env.Email_Pass;

module.exports.NodeMailer = async ( User_mail,   sub) => {
  const user = await Meeting.findOne({ email: User_mail });

 

  const updated = await Meeting.findByIdAndUpdate(user._id, user);
  console.log(updated);
  if (updated) {
    sendEmail();
  }

  async function sendEmail() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Email_Id,
        pass: Email_Pass,
      },
    });

    await transporter.sendMail({
      from: User_mail,
      to: Email_Id,
      subject: ` ${sub} link`,
      text:"new Meeting is scheduled"
      
    });

    console.log(`Mail sent to ${User_mail}`);
  }
};
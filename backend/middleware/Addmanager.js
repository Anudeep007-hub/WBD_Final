const Manager = require('../models/Manager'); // Your Manager model
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const addManager = async (req, res) => {
  try {
    const { name, email, section } = req.body;

    // Generate a random password
    const password = Math.random().toString(36).slice(-8);

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new manager
    const manager = new Manager({
      name,
      email,
      password: hashedPassword,
      section,
    });

    await manager.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., Gmail; use other providers as needed
      auth: {
        user: 'tharunkumarlagisetty@gmail.com', // Replace with your email
        pass: 'bjbt ovza dnuf ayyp',   // Replace with your email password or app-specific password
      },
    });

    // Email content
    const mailOptions = {
      from: 'tharunkumarlagisetty@gmail.com',
      to: email,
      subject: 'Your Manager Account Credentials',
      text: `Dear ${name},\n\nYour manager account has been created successfully.\n\nHere are your credentials:\nEmail: ${email}\nPassword: ${password}\n\nPlease log in and change your password immediately.\n\nThank you!`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Manager added and email sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding manager or sending email.', error: error.message });
  }
};

module.exports = addManager;

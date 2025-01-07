const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors()); // 启用所有路由的CORS

// 模拟用户数据库
const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
];

// 配置nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  // 检查用户数据库中是否存在该邮箱
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(404).json({ message: 'Email not found' });
  }

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the link to reset your password: http://localhost:3000/reset-password?email=${email}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email', error: error.message });
    } else {
      console.log('Email sent:', info.response);
      return res.status(200).json({ message: 'Password reset link sent' });
    }
  });
});

app.post('/api/reset-password', (req, res) => {
  const { email, password } = req.body;

  // 检查用户数据库中是否存在该邮箱
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Email not found' });
  }

  // 更新用户密码
  users[userIndex].password = password;
  return res.status(200).json({ message: 'Password reset successfully' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
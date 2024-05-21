const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vaibhavkushwah02:EeTOPXriHmTGu7N3@vaibhavk.izi8reb.mongodb.net/VaibhavK?retryWrites=true&w=majority&appName=VaibhavK', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

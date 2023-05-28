const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log('Mongo Connected successfully!');
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;

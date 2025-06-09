// const mongoose = require('mongoose');

// function connectToDB(){
//    mongoose.connect(process.env.MONGO_URI).then(() => {
//    console.log('connect to DB');
//    })
// }

// module.exports =connectToDB;
const mongoose = require('mongoose');

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // force stop if DB not connected
  });
}

module.exports = connectToDB;

import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Create a class called DbConnect.
class DbConnect {

  constructor() {

    // The MongoDB URL for the database.
    this.mongodbUrl = process.env.MONGODBURL || 'mongodb://localhost/ouauth';
    this.connectDb().catch(err => console.log(err));
  }

  // Connect to the database.
  async connectDb() {
    await mongoose.connect(this.mongodbUrl);
  }

  // Close the database connection.
  async closeDbConnection() {
    await mongoose.connection.close();
  }
  
}

export default DbConnect;


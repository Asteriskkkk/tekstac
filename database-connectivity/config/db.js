const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (uri) {
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB at ${uri}`);
    return;
  }

  memoryServer = await MongoMemoryServer.create();
  const mongoUri = memoryServer.getUri();

  await mongoose.connect(mongoUri);
  console.log(`Connected to in-memory MongoDB at ${mongoUri}`);
}

async function disconnectDB() {
  await mongoose.disconnect();

  if (memoryServer) {
    await memoryServer.stop();
  }
}

module.exports = { connectDB, disconnectDB };

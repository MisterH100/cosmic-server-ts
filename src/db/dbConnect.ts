import mongoose from "mongoose";


const connectToDatabase = () => {
  const environment = process.env.ENVIRONMENT as string;
  let mongoString = "";

  if (environment == "development") {
    mongoString = process.env.MONGO_STRING_DEV as string;
  } else {
    mongoString = process.env.MONGO_STRING_PROD as string;
  }
  mongoose
    .connect(mongoString)
    .then(() => console.log(`
Connection: success
Environment: ${process.env.ENVIRONMENT}
Database: ${process.env.ENVIRONMENT == "development" ? "test" : "primary"}
      `))
    .catch((err) => {
      console.log({ message: "Failed to Connect to DataBase", err });
    });
};

export default connectToDatabase;

import mongoose from "mongoose";

const mongoString: string = process.env.MONGO_STRING || " ";
const connectToDatabase = () => {
  mongoose
    .connect(mongoString)
    .then(() => console.log("Connected to DataBase"))
    .catch((err) => {
      console.log(err + "Failed to Connect to DataBase");
    });
};

export default connectToDatabase;

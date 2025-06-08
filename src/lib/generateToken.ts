import jwt from "jsonwebtoken";

const generateJWTToken = async (user_id: any) => {
  const secret = process.env.JWT_SECRET as string;
  const token = jwt.sign({ user_id }, secret, {
    expiresIn: "15d",
  });
  return token;
};

export default generateJWTToken;

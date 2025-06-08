import express from "express"
import bcrypt from "bcrypt";
import CosmicUser from "../models/cosmic-user.model";
import generateJWTToken from "../lib/generateToken";

export const RegisterCosmicUser = async (req: express.Request, res: express.Response) => {
  const { pc, room, password } = req.body;

  try {
    const user = await CosmicUser.findOne({ pc: pc });
    if (user) {
      res.status(409).json({ message: "This computer number is taken" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = new CosmicUser({
        pc: pc,
        username: pc,
        userlast: " ",
        useremail: " ",
        usercountry: " ",
        room: room,
        password: hashedPassword,
      });

      const token = await generateJWTToken(newUser._id);
      await newUser.save();
      res.status(200).json({
        message: "Computer registered successfully",
        user: {
          _id: newUser._id,
          pc: newUser.pc,
          username: newUser.username,
          userlast: newUser.userlast,
          useremail: newUser.useremail,
          usercountry: newUser.usercountry,
          room: newUser.room,
        },
        token: token,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register, internal server error" });
  }
};

export const SignUpCosmicUser = async (req: express.Request, res: express.Response) => {
  const { pc, room, username, userlast, useremail, usercountry, password } = req.body;

  try {
    const user = await CosmicUser.findOne({ pc: pc });
    if (user) {
      res.status(409).json({ message: "This computer number is taken" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = new CosmicUser({
        pc: pc,
        username: username,
        userlast: userlast,
        useremail: useremail,
        usercountry: usercountry,
        room: room,
        password: hashedPassword,
      });

      const token = await generateJWTToken(newUser._id);
      await newUser.save();
      res.status(200).json({
        message: "Computer registered successfully",
        user: {
          _id: newUser._id,
          pc: newUser.pc,
          username: newUser.username,
          userlast: newUser.userlast,
          useremail: newUser.useremail,
          usercountry: newUser.usercountry,
          room: newUser.room,
        },
        token: token,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register, internal server error" });
  }
};


export const LoginCosmicUser = async (req: express.Request, res: express.Response) => {
  const { pc, password } = req.body;
  try {
    const user = await CosmicUser.findOne({ pc: pc });
    if (!user) {
      res.status(400).json({ message: "Computer does not exist" });
    } else {
      const validatePassword = bcrypt.compareSync(password, user.password);

      if (!validatePassword) {
        res.status(400).json({ message: "Wrong credentials" });
      }
      if (validatePassword) {
        const token = await generateJWTToken(user._id);
        await CosmicUser.findByIdAndUpdate(user._id, {
          $set: { logged_in: true },
        });
        const { password, ...details } = user._doc;
        res
          .status(200)
          .json({ message: "login successful", user: details, token: token });
      }
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to login, internal server error" });
  }
};

export const LogoutCosmicUser = async (req: express.Request, res: express.Response) => {
  const { pc, room } = req.body;
  try {
    await CosmicUser.findOneAndUpdate(
      { pc: pc, room: room },
      { logged_in: false },
    );

    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to logout, internal server error" });
  }
};

// export const updateUser = async (req:express.Request, res:express.Response) => {
//   const userID = req.user._id;
//   const { address, phone } = req.body;
//   const schema = vine.object({
//     address: vine.string(),
//     phone: vine.string(),
//   });
//
//   const data = {
//     address: address,
//     phone: phone,
//   };
//   try {
//     const validator = vine.compile(schema);
//     await validator.validate(data);
//
//     await User.findByIdAndUpdate(userID, {
//       $set: { address: address, phone: phone },
//     });
//     res.status(200).json({ message: "update successfully" });
//   } catch (error) {
//     if (error instanceof errors.E_VALIDATION_ERROR) {
//       res.status(400).json({
//         message: error.messages[0].message,
//       });
//     } else {
//       res
//         .status(500)
//         .json({ message: "failed to update, internal server error" });
//     }
//   }
// };
//
// export const authUser = async (req:express.Request, res:express.Response) => {
//   const userID = req.user._id;
//   try {
//     const user = await User.findById(userID);
//
//     if (!user) {
//       res.status(400).json({ message: "user does not exist" });
//     } else {
//       await User.findByIdAndUpdate(user._id, {
//         $set: { logged_in: true },
//       });
//       const { password, ...details } = user._doc;
//       res
//         .status(200)
//         .json({ message: "authenticated successfully", user: details });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "failed to authenticate, internal server error" });
//   }
// };
//

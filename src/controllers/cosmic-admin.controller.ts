import express from "express"
import bcrypt from "bcrypt";
import CosmicAdmin from "../models/cosmic-admin.model";
import generateJWTToken from "../lib/generateToken";

export const RegisterCosmicAdmin = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  const role = "admin"
  const clearanceLevel = 0;
  try {
    const user = await CosmicAdmin.findOne({ email: email });
    if (user) {
      res.status(409).json({ message: "This user alread exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const newUser = new CosmicAdmin({
        email: email,
        password: hashedPassword,
        role: role,
        clearance_level: clearanceLevel
      });

      const token = await generateJWTToken(newUser._id);
      await newUser.save()
      res.status(200).json({
        message: "registered successfully",
        user: {
          _id: newUser._id,
          email: newUser.email,
          role: newUser.role,
          clearanceLevel: newUser.clearance_level
        },
        token: token,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to register, internal server error", });
  }
};

export const LoginCosmicAdmin = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    const user = await CosmicAdmin.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "Admin does not exist" });
    } else {
      const validatePassword = bcrypt.compareSync(password, user.password);

      if (!validatePassword) {
        res.status(400).json({ message: "Wrong credentials" });
      }
      if (validatePassword) {
        const token = await generateJWTToken(user._id);
        await CosmicAdmin.findByIdAndUpdate(user._id, {
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

export const LogoutCosmicAdmin = async (req: express.Request, res: express.Response) => {
  const { email } = req.body;
  try {
    await CosmicAdmin.findOneAndUpdate({ email: email }, { logged_in: false });

    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to logout, internal server error" });
  }
};

export const UpdateCosmicAdminClearance = async (req: express.Request, res: express.Response) => {
  const { email, level } = req.body;
  try {
    await CosmicAdmin.findOneAndUpdate({ email: email }, { clearance_level: level });
    res.status(200).json({ message: "update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to update, internal server error" });
  }
};

export const UpdateCosmcicAdminPass = async (req: express.Request, res: express.Response) => {
  const { password, id, email } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (email == "") {
      await CosmicAdmin.findByIdAndUpdate(id, {
        $set: { password: hashedPassword },
      });
      res.status(200).json({ message: "update successfully" });

    } else {
      await CosmicAdmin.findOneAndUpdate({ email: email }, {
        $set: { password: hashedPassword },
      });
      res.status(200).json({ message: "update successfully" });

    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to update, internal server error" });
  }
};

// export const authUser = async (req, res) => {
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

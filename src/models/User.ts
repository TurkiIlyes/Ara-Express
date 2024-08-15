import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  status: "active" | "inactive";
}

const userSchema = new Schema<UserType>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "name required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: [8, "Too short password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    }
  },
  { timestamps: true }
);


const UserModel = mongoose.model<UserType>("User", userSchema);

export default UserModel;

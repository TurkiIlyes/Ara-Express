import mongoose, { Schema, Document } from "mongoose";

export interface ProjectType extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  type:"MDTR"| "GDEE" ;
}

const projectSchema = new Schema<ProjectType>(
  {
    name: {
      type: String,
      required: [true, "Project required"],
      unique: true,
      minlength: [3, "Too short project name"],
    },
    image: String,
    type: {
      type: String,
      enum: ["MDTR", "GDEE"]
    },
  },
  { timestamps: true }
);


const Project = mongoose.model<ProjectType>("Project", projectSchema);

export default Project;

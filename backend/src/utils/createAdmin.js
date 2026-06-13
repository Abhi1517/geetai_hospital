import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const createAdmin = async () => {

const hash =
await bcrypt.hash(
"Admin@123",
10
);

await Admin.create({
 email:"admin@geetai.com",
 password:hash
});

console.log("Admin Created");
};

export default createAdmin;
import mongoose from 'mongoose';
import { MONGO_CONNECTION_STRING } from '../config';
import UserModel from '../models/users';


// async function createSuperAdmin() {
//   try {
//       const superAdmin = new UserModel({
//         _id: "6769cdbdad280c9ce9ba9fcb",
//         email: "superadmin@sofra.com",
//         password: "$2a$12$m8a4HAcHY3KYHf7Bcn/qRu7V4eM15JUjn/YYFz0EwsI0EFLhmPbW6", // كلمة السر المشفرة
//         role: "superAdmin",
//       });

//       await superAdmin.save();
//       console.log('Super admin created successfully');
    
//   } catch (error) {
//     console.error('Error creating super admin:', error.message);
//   }
// }

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log('Connected to the database');
    
    // await createSuperAdmin();
  } catch (e) {
    console.error('Error connecting to the database:', e.message);
  }
}

export default connectToDatabase;

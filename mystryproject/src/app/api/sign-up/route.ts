
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationemails";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request:Request){
    await dbConnect();


    try {
        const {username,email,password}= await request.json()
        const existingUserVerifiedByUsername = await
        UserModel.findOne({ 
            username,
            isVerified:true
        })
        if(existingUserVerifiedByUsername){
            return Response.json({
              success:false,
              message:"Username is Already taken"
            },{status:400})
        }
       
        const existingUserbyEmail = await UserModel.findOne
        ({email})
         
        const verifyCode= Math.floor(100000+Math.random()
     *900000).toString()
         

         if(existingUserbyEmail){
              if(existingUserbyEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },{status:400})
              }else{
                const hasedPassword= await bcrypt.hash(password,10)
                existingUserbyEmail.password=hasedPassword;
                 existingUserbyEmail.password=verifyCode;
                 existingUserbyEmail.verifyCodeExpiry= new Date(Date.now()+3600000)
                 await existingUserbyEmail.save();
              }
         }
         else {
            const hasedPassword = await bcrypt.hash(password,10)

            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

            const newUser=  new UserModel({
                 username,
                    email,
                    password:hasedPassword,
                    verifyCode,
                    verifyCodeExpiry:expiryDate,
                    isVerified :false,
                    isAcceptingMessage:true,
                    message: []
            })

            await newUser.save();
         }
          const emailResponse= await sendVerificationEmail(
            email,
            username,
            verifyCode
          )
          if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
          }
          return Response.json({
            success:true,
            message:"User Registered Successfully. Please Verify Your Email"
          },{status:201 })
    } catch (error) {
         console.log("Error registering user",error)
         return Response.json(
            {success:false,
                message:"Error registerign user"
            },
            {
                status:500
            }
         )
    }
}
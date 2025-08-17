import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";


export async function POST(request: Request){
    await dbConnect();
     try {
         const {username,code}= await request.json();
        const decodedUsername= decodeURIComponent(username);
        const user = await UserModel.findOne({username:decodedUsername});
        if(!user){
        return Response.json(
        {
        success: false,
        message: "User not found"
       },
      {
        status: 500
      }
    )}

    const isCodeValid = user.verifyCode ===code
     const isCodeNotexpired = new Date(user.verifyCodeExpiry) > new Date();
     if(isCodeValid && isCodeNotexpired){
         user.isVerified =true;
         await user.save();

         return Response.json(
        {
        success: true,
        message: "Account Verified successfully"
       },
      {
        status: 200
      }
    )
     }
     else if(!isCodeNotexpired){
         
         return Response.json(
        {
        success: false,
        message: "Verification Code is Expired , please signup again to get a new code "
       },
      {
        status: 400
      }
    )
     }
     else{
          return Response.json(
        {
        success: false,
        message: "Incorrect Verification Code "
       },
      {
        status: 400
      }
    )
     }
     } catch (error) {
        console.log("Error verifying User ", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user"
      },
      {
        status: 500
      }
    );
     }
}
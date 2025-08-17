import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/user';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/options';

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const { messageId } = params;
  const userId = new mongoose.Types.ObjectId(_user._id);

  try {
    // Verify the messageId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return Response.json(
        { success: false, message: 'Invalid message ID' },
        { status: 400 }
      );
    }

    // Find the user and remove the specific message
    const result = await UserModel.updateOne(
      { _id: userId },
      { $pull: { message: { _id: new mongoose.Types.ObjectId(messageId) } } }
    );

    if (result.matchedCount === 0) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    if (result.modifiedCount === 0) {
      return Response.json(
        { success: false, message: 'Message not found or already deleted' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting message:', error);
    return Response.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

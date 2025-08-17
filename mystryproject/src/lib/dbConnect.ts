import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable");
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        connection.isConnected = db.connections[0].readyState;
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection failed", error);
        throw error;
    }
}

export default dbConnect;

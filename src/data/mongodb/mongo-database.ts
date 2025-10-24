import mongoose from "mongoose";
import colors from "colors";

interface Options {
    mongoUrl: string;
    dbName: string;
}

export class MongoDatabase {
   
    static async connect(options: Options) {
        const { mongoUrl, dbName } = options

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName
            });

            console.log(colors.blue.bold(('MongoDB connected successfully')));
        } catch (error) {
            console.log(colors.red.bold(('Error connecting to MongoDB')));
            throw error;
        }
    }

}
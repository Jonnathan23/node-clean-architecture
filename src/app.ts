import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    //todo: iniciar servidor
    new Server({ port: envs.PORT, routes: AppRouter.routes }).start();
}
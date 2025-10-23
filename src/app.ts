import { envs } from "./config";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})()


async function main() {
    //todo: await bnase de datos

    //todo: iniciar servidor
    new Server({ port: envs.PORT, routes: AppRouter.routes }).start();
}
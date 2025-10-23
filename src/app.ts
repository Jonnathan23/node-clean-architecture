import { envs } from "./config";
import { Server } from "./presentation/server";

(() => {
    main();
})()


async function main() {
    //todo: await bnase de datos

    //todo: iniciar servidor
    new Server({ port: envs.PORT }).start();
}
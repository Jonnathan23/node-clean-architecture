import express, { Router } from 'express'
import colors from 'colors'


interface Options {
    port?: number
    routes: Router
}

export class Server {

    public readonly app = express()
    private readonly port: number;
    private readonly routes: Router;


    constructor(options: Options) {
        const { port = 3100, routes } = options
        this.port = port
        this.routes = routes
    }

    async start() {
        //Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true })) //x-www-form-urlencoded

        this.app.use(this.routes)

        this.app.listen(this.port, () => {
            console.log(colors.cyan.bold(`Server running on port ${this.port}`))
        })
    }
}
import express from 'express'
import colors from 'colors'


interface Options {
    port?: number
}

export class Server {

    public readonly app = express()
    private readonly port: number;

    constructor(options: Options) {
        const { port = 3100 } = options
        this.port = port
    }

    async start() {
        this.app.listen(this.port, () => {
            console.log(colors.cyan.bold(`Server running on port ${this.port}`))
        })
    }
}
import jwt, { SignOptions } from 'jsonwebtoken';


export class JwtAdapter {
    static async generateToken(payload: Object, duration: SignOptions['expiresIn'] = '2h'): Promise<string | null> {

        //TODO: cambiar "seed" por variable de entorno
        return new Promise((resolve) => {
            jwt.sign(payload, "seed", { expiresIn: duration }, (err, token) => {
                if (err) return resolve(null);

                resolve(token!);

            })
        })

    }
}
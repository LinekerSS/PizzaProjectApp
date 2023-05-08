import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: String
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    

    // Receber o token
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).end();
    }

    // Aqui eu tiro o barear do token
    const [, token] = authToken.split(" ")

    try {

        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;

        // Recuperar o id do token e inserir em na variavel user_id dentro do req.
        req.user_id = sub;

        console.log(sub);
        

        next();
        
    } catch (error) {
        return res.status(401).end(); 
    }
    

}
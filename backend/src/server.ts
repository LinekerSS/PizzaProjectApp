import express, { Request, Response, NextFunction } from "express";
import router from "./routess";
import cors from 'cors';
import path from 'path';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router); 
// Esse app.use serve para salvar arquivos de imagens no banco de dados
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, next: NextFunction)=> {
    if(err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
     
});

app.listen(3333, () => {
    console.log('Servidor Online!');
    
});
import {Request, Response} from 'express';
import { CreateProductsService } from '../../services/Products/CreateProductsService';

class CreateProductController {
    async handle(req: Request, res: Response) {

        const {name, price, description, category_id} = req.body;

        const createProductService = new CreateProductsService();

        if(!req.file) {
            throw new Error('error upload file');
        } else {

            const { originalname, filename: banner} = req.file

            const products = await createProductService.execute({
                name,
                price,
                description,
                banner, 
                category_id
            });
    
            return res.json(products);
        }

        
    }
}

export { CreateProductController }
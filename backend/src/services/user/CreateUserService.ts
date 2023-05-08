import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({name, email, password} : UserRequest) {

        // Verificar se ele enviu um email
        if(!email) {
            throw new Error("Email incorrect")
        }

        // Verificar se esse email já está cadastrado no banco de dados
        const userAlreadyExits = await prismaClient.user.findFirst({
            where: {
                email : email
            }
        }) 

        if(userAlreadyExits) {
            throw new Error("User already exists")
        }

        // passwordHash recebe a senha do usuário e a quantidade de caracteres
        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })
        
        return user;
    }
}

export { CreateUserService }
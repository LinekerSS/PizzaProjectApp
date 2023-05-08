import prismaClient from "../../prisma";

interface OrderService {
    table: number,
    name: string
}

class CreateOrderService {
    async execute({ table, name }: OrderService) {

        const order = await prismaClient.order.create({
            data: {
                table: table,
                name: name
            }
        })
        return order;
    }
}

export { CreateOrderService }
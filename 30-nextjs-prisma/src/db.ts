import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(name: string, email: string): Promise<User> {
    // ... you will write your Prisma Client queries here
    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
        },
    })
    return user;
}

export async function getUserById(id: number) {
    // ... you will write your Prisma Client queries here
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })
    return user
}

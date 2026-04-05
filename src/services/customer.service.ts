import {CreateCustomerInput, UpdateCustomerInput} from "../validations/customer.validation";
import {prisma} from "../lib/prisma";

export const createCustomerService = async (input: CreateCustomerInput, workspaceId: string) => {
    const result = await prisma.customer.create({
        data: {
            ...input,
            workspaceId: workspaceId
        }
    })

    return result
}

export const updateCustomerService = async (input: UpdateCustomerInput, workspaceId: string, id: string) => {
    const result = await prisma.customer.update({
        where: {
            id,
            workspaceId
        },
        data: input
    })

    return result
}

export const getCustomersService = async (workspaceId: string) => {
    const result = await prisma.customer.findMany({
        where: {
            workspaceId
        }
    })

    return result
}

export const getCustomerService = async (workspaceId: string, id: string) => {
    const result = await prisma.customer.findUnique({
        where: {
            id,
            workspaceId
        }
    })

    return result
}

export const deleteCustomerService = async (workspaceId: string, id: string) => {
    const result = await prisma.customer.delete({
        where: {
            id,
            workspaceId
        }
    })

    return result
}
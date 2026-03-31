import {prisma} from "../lib/prisma";
import {CreateContactInput, UpdateContactInput} from "../validations/contact.validation";

export const createContactService = async (input: CreateContactInput, workspaceId: number) => {
    const result = await prisma.contact.create({
        data: {
            ...input,
            workspaceId
        }
    })

    return result
}

export const getContactsService = async (workspaceId: number, customerId?: number) => {
    const result = await prisma.contact.findMany({
        where: {
            workspaceId,
            ...(customerId ? { customerId } : {})
        }
    })

    return result
}

export const getContactService = async (workspaceId: number, id: number) => {
    const result = await prisma.contact.findUnique({
        where: {
            workspaceId,
            id
        }
    })

    return result
}

export const updateContactService = async (input: UpdateContactInput, workspaceId: number, id: number) => {
    const result = await prisma.contact.update({
        where: {
            workspaceId,
            id
        },
        data: input
    })

    return result
}

export const deleteContactService = async (workspaceId: number, id: number) => {
    const result = await prisma.contact.delete({
        where: {
            workspaceId,
            id
        }
    })

    return result
}
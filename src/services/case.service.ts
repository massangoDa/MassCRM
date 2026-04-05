import {prisma} from "../lib/prisma";
import {CreateCaseInput, UpdateCaseInput} from "../validations/case.validation";

export const createCaseService = async (input: CreateCaseInput, workspaceId: string) => {
    const result = await prisma.case.create({
        data: {
            ...input,
            workspaceId,
        }
    })

    return result
}

export const getCasesService = async (workspaceId: string, customerId?: string) => {
    const result = await prisma.case.findMany({
        where: {
            workspaceId,
            ...(customerId ? { customerId } : {})
        }
    })

    return result
}

export const getCaseService = async (workspaceId: string, id: string) => {
    const result = await prisma.case.findUnique({
        where: {
            workspaceId,
            id
        }
    })

    return result
}

export const updateCaseService = async (input: UpdateCaseInput, workspaceId: string, id: string) => {
    const result = await prisma.case.update({
        where: {
            workspaceId,
            id
        },
        data: input
    })

    return result
}

export const deleteCaseService = async (workspaceId: string, id: string) => {
    const result = await prisma.case.delete({
        where: {
            workspaceId,
            id
        }
    })

    return result
}
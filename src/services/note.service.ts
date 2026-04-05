import {prisma} from "../lib/prisma";
import {CreateNoteInput, UpdateNoteInput} from "../validations/note.validation";

export const createNoteService = async (input: CreateNoteInput, workspaceId: string) => {
    const result = await prisma.note.create({
        data: {
            ...input,
            workspaceId,
        }
    })

    return result
}

export const getNotesService = async (workspaceId: string, customerId?: string) => {
    const result = await prisma.note.findMany({
        where: {
            workspaceId,
            ...(customerId ? { customerId } : {})
        }
    })

    return result
}

export const getNoteService = async (workspaceId: string, id: string) => {
    const result = await prisma.note.findUnique({
        where: {
            workspaceId,
            id
        }
    })

    return result
}

export const updateNoteService = async (input: UpdateNoteInput, workspaceId: string, id: string) => {
    const result = await prisma.note.update({
        where: {
            workspaceId,
            id
        },
        data: input
    })

    return result
}

export const deleteNoteService = async (workspaceId: string, id: string) => {
    const result = await prisma.note.delete({
        where: {
            workspaceId,
            id
        }
    })

    return result
}
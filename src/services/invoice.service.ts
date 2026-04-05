import {prisma} from "../lib/prisma";
import {CreateInvoiceInput, UpdateInvoiceInput} from "../validations/invoice.validation";
import {InvoiceStatus} from "../../generated/prisma/enums";

export const createInvoiceService = async (input: CreateInvoiceInput, workspaceId: string) => {
    const case_ = await prisma.case.findUnique({
        where: {
            workspaceId,
            id: input.caseId
        },
        select: {
            customerId: true
        }
    })
    if (!case_) {
        throw new Error("案件が見つかりません")
    }

    const result = await prisma.invoice.create({
        data: {
            ...input,
            workspaceId,
            customerId: case_.customerId
        }
    })

    return result
}

export const getInvoicesService = async (workspaceId: string, caseId?: string) => {
    const result = await prisma.invoice.findMany({
        where: {
            workspaceId,
            ...(caseId ? { caseId } : {})
        }
    })

    return result
}

export const getInvoiceService = async (workspaceId: string, id: string) => {
    const result = await prisma.invoice.findUnique({
        where: {
            workspaceId,
            id
        }
    })

    return result
}

export const updateInvoiceService = async (input: UpdateInvoiceInput, workspaceId: string, id: string) => {
    const invoice = await prisma.invoice.findUnique({
        where: { id, workspaceId }
    })
    if (!invoice) {
        throw new Error("請求書が存在しません")
    }
    if (invoice.status === InvoiceStatus.SENT || invoice.status === InvoiceStatus.PAID) {
        throw new Error('発行済みの請求書は変更できません')
    }

    const result = await prisma.invoice.update({
        where: {
            workspaceId,
            id
        },
        data: input
    })

    return result
}

export const deleteInvoiceService = async (workspaceId: string, id: string) => {
    const invoice = await prisma.invoice.findUnique({
        where: { id, workspaceId }
    })
    if (!invoice) {
        throw new Error("請求書が存在しません")
    }
    if (invoice.status === InvoiceStatus.SENT || invoice.status === InvoiceStatus.PAID) {
        throw new Error('発行済みの請求書は変更できません')
    }

    const result = await prisma.invoice.delete({
        where: {
            workspaceId,
            id
        }
    })

    return result
}
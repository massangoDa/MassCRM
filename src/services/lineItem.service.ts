import {prisma} from "../lib/prisma";
import {CreateLineItemInput, UpdateLineItemInput} from "../validations/invoice.validation";
import {InvoiceStatus} from "../../generated/prisma/enums";

export const createLineItemService = async (input: CreateLineItemInput) => {
    const invoice = await prisma.invoice.findUnique({
        where: {
            id: input.invoiceId,
        }
    })
    if (!invoice) {
        throw new Error("請求書が存在しません")
    }
    if (invoice.status === InvoiceStatus.SENT || invoice.status === InvoiceStatus.PAID) {
        throw new Error("発行済みの請求書は変更できません")
    }

    const result = await prisma.lineItem.create({
        data: input
    })

    return result
}

export const getLineItemsService = async (invoiceId: string) => {
    const result = await prisma.lineItem.findMany({
        where: {
            invoiceId
        }
    })

    return result
}

export const getLineItemService = async (id: string) => {
    const result = await prisma.lineItem.findUnique({
        where: {
            id
        }
    })

    return result
}

export const updateLineItemService = async (input: UpdateLineItemInput, id: string) => {
    const lineItem = await prisma.lineItem.findUnique({
        where: {
            id
        },
        include: {
            invoice: true
        }
    })
    if (!lineItem) {
        throw new Error("明細が存在しません")
    }
    if (lineItem.invoice.status === InvoiceStatus.SENT || lineItem.invoice.status === InvoiceStatus.PAID) {
        throw new Error("発行済みの請求書は変更できません")
    }

    const result = await prisma.lineItem.update({
        where: {
            id
        },
        data: input
    })

    return result
}

export const deleteLineItemService = async (id: string) => {
    const lineItem = await prisma.lineItem.findUnique({
        where: {
            id
        },
        include: {
            invoice: true
        }
    })
    if (!lineItem) {
        throw new Error("明細が存在しません")
    }
    if (lineItem.invoice.status === InvoiceStatus.SENT || lineItem.invoice.status === InvoiceStatus.PAID) {
        throw new Error("発行済みの請求書は変更できません")
    }

    const result = await prisma.lineItem.delete({
        where: {
            id
        }
    })

    return result
}
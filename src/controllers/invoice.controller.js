const invoiceService = require('../services/invoice.service')

const getAllListInvoice = async (req, res) => {
    console.log(req.user)
    try {
        const listInvoice = await invoiceService.getAllInvoice()
        res.status(200).json({
            message: "List all invoice",
            data: listInvoice
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createInvoice = async (req, res) => {
    try {
        const dataInvoice = req.body
        const invoice = await invoiceService.createInvoice(dataInvoice)
        res.status(201).json({
            message: "Create invoice success",
            data: invoice
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getInvoiceById = async (req, res) => {
    try {
        const id = req.params.id
        const invoice = await invoiceService.getInvoiceById(id)
        res.status(200).json({
            message: "Get invoice by id success",
            data: invoice
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateInvoice = async (req, res) => {
    try {
        const id = req.params.id
        const dataInvoice = req.body
        const invoice = await invoiceService.updateInvoice(id, dataInvoice)
        res.status(200).json({
            message: "Update invoice success",
            data: invoice
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteInvoiceById = async (req, res) => {
    try {
        const id = req.params.id
        const invoice = await invoiceService.deleteInvoiceById(id)
        res.status(200).json({
            message: "Delete invoice success",
            data: invoice
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllListInvoice, createInvoice, getInvoiceById, updateInvoice, deleteInvoiceById
}
const invoiceModel = require('../model/Invoice.model')

const getAllInvoice = async () => {
    try {
        const invoices = await invoiceModel.find();
        console.log('All invoices:', invoices);
        return invoices;
    } catch (error) {
        console.error('Error fetching invoices:', error);
        throw error;
    }
};

const createInvoice = async (data) => {
    try {
        const newInvoice = await invoiceModel.create(data);
        console.log('Invoice created:', newInvoice);
        return newInvoice;
    } catch (error) {
        console.error('Error creating invoice:', error);
        throw error;
    }
};

const getInvoiceById = async (id) => {
    try {
        const invoice = await invoiceModel.findById(id);
        return invoice;
    } catch (error) {
        console.error('Error fetching invoice by id:', error);
        throw error;
    }
}

const updateInvoice = async (id, dataInvoice) => {
    try {
        const invoice = await invoiceModel.findByIdAndUpdate(id, dataInvoice, { new: true });
        return invoice;
    } catch (error) {
        console.error('Error updating invoice:', error);
        throw error;
    }
}

const deleteInvoiceById = async (invoiceId) => {
    try {
        const deletedInvoice = await invoiceModel.findByIdAndDelete(invoiceId);
        if (!deletedInvoice) {
            throw new Error('Invoice not found');
        }
        console.log('Deleted invoice:', deletedInvoice);
        return deletedInvoice;
    } catch (error) {
        console.error('Error deleting invoice:', error);
        throw error;
    }
};

module.exports = {
    getAllInvoice, createInvoice, getInvoiceById, updateInvoice, deleteInvoiceById
}
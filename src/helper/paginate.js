const getPagination = async (model, current, pageSize) => {
    const offset = (current - 1) * pageSize;

    const [listPagination, totalItem] = await Promise.all([
        model.find().skip(offset).limit(pageSize).exec(),
        model.countDocuments().exec()
    ]);
    return { listPagination, totalItem };
};


module.exports = { getPagination }

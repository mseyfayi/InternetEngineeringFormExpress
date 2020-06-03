import * as service from "./formService";

export const post = (req, res, next) => {
    const data = req.body;
    service
        .store(data)
        .then(data => res.status(200).send({message: `${data.title} successfully added`}))
        .catch(error => next(error));
};

export const get = (req, res) => {
    service
        .read()
        .then(data => res.status(200).send({message: 'Forms list', data}));
};

export const getById = (req, res) => {
    const id = req.params.id;
    service
        .find(id)
        .then(data => res.status(200).send({message: `Form ${id} detail`, data}));
};

import * as service from "./formService";

export const post = (req, res, next) => {
    const data = req.body;
    service.store(data)
        .then(data => res.status(200).send({message: `${data.title} successfully added`}))
        .catch(error => next(error));
};

export const get = (req, res) => {
    res.sendStatus(200)
};

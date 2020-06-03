import formsValidations from "./formsValidations";
import * as formData from "./formData";

export const store = data => new Promise((resolve, reject) =>
    formsValidations(data)
        .then(data => {
            formData
                .store(data)
                .then(resolve)
                .catch(error =>
                    reject({
                        body: error.toString(),
                    }))
        })
        .catch(error =>
            reject({
                status: error.status || 422,
                body: error.error
            })));

export const read = () => new Promise(resolve =>
    formData
        .read()
        .then(data => resolve(data.map(item => ({title: item.title, id: item.id}))))
);


export const find = id => new Promise(resolve =>
    formData
        .read()
        .then(data => resolve(data.find(item => item.id === id)))
);

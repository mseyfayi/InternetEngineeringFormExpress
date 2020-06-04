import {log as formValidationLog, store as formsValidationsStore} from "./formsValidations";
import * as formData from "./formData";
import logger from "../logger";

export const store = data => new Promise((resolve, reject) =>
    formsValidationsStore(data)
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

export const find = id => new Promise((resolve, reject) =>
    formData
        .read()
        .then(data => data.find(item => item.id === id))
        .then(found => {
            if (found) {
                resolve(found);
            } else {
                reject({status: 404, body: {message: `The form ${id} not found`}});
            }
        })
        .catch(reject)
);


export const log = (id, data) => new Promise((resolve, reject) => {
    formValidationLog(id, data)
        .then(() => {
            logger.log('info', `Form: ${id} ${JSON.stringify(data).replace(/"([^"]+)":/g, '$1:')}`);
            resolve()
        })
        .catch(error => reject({
            status: error.status || 422,
            body: error.error
        }))
});

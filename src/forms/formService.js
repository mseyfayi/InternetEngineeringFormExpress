import formsValidations from "./formsValidations";

export const store = data => new Promise((resolve, reject) => {
    formsValidations(data)
        .then(data => {
            //todo store
            resolve(data);
        })
        .catch(error => {
            reject({
                status: 422,
                body: error
            })
        });
});
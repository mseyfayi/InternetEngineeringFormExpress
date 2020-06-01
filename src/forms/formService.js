import formsValidations from "./formsValidations";
import * as formData from "./formData";

export const store = data => new Promise((resolve, reject) => {
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
                status: 422,
                body: error
            }));
});

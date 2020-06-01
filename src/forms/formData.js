import * as repository from "../repository";

const func = name => data => new Promise((resolve, reject) => {
    repository[name](data)
        .then(resolve)
        .catch(reject);
});

export const store = func('write');
export const read = func('read');

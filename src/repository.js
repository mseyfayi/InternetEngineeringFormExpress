import fs from "fs";
import logger from "./logger";

const getDatabasePath = process.env.NODE_ENV !== 'test' ? 'db.json' : 'testDB.json';

let forms;

/*
* Clears json file for test
*/
export const clearForTest = () => new Promise((resolve, reject) => {
    forms = [];
    const clearedForms = JSON.stringify({forms});
    fs.writeFile(getDatabasePath, clearedForms, {encoding: 'utf8'}, error => {
        if (!error) {
            resolve();
        } else {
            reject();
            logger.log('error', 'Clear file crashed', error);
        }
    })
});

export const readDBForTest = () => new Promise((resolve) =>
    fs.readFile(getDatabasePath, (error, rawData) => {
        if (!error) {
            resolve(JSON.parse(rawData + '').forms)
        } else {
            logger.log('error', 'read file crashed', error);
            resolve([]);
        }
    })
);

/*
* If "forms" has been set before returns that
* Otherwise tries to read "db.json" and save it in "forms" if there was "db.json"
* Otherwise set [] in "forms"
*/
export const read = () => new Promise((resolve) => {
    if (forms) {
        resolve(forms);
    } else {
        try {
            fs.readFile(getDatabasePath, (error, rawData) => {
                if (!error) {
                    forms = JSON.parse(rawData + '').forms;
                    resolve(forms);
                } else {
                    logger.log('error', 'read file crashed', error);
                    forms = [];
                    resolve(forms);
                }
            })
        } catch (e) {
            logger.log('error', 'read file crashed', e);
            forms = [];
            resolve(forms);
        }
    }
});

/*
* Gets forms by calling read()
* And changes the 'forms'
*/
export const write = (data) => new Promise((resolve, reject) => {
    read()
        .then(res => {
            // creating forms
            const formsCollections = JSON.stringify({
                forms: [...res, data]
            });

            // writing created 'forms' in 'db.json'
            fs.writeFile(getDatabasePath, formsCollections, {encoding: 'utf8'}, error => {
                if (!error) {
                    // updating 'forms'
                    forms = [...res, data];
                    resolve(data);
                } else {
                    logger.log('error', 'write file crashed', error);
                    reject(error);
                }
            })
        })
        .catch(error => {
            logger.log('error', 'write file crashed', error);
            reject(error);
        })
});

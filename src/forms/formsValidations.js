import * as formData from './formData';

const hasRequired = (data, field) => !!data[field.toLocaleLowerCase()];

const idConflict = async (data) => {
    const forms = await formData.read();
    return !!forms.find(item => item.id === data.id)
};

const isRawString = str => /^([a-zA-Z0-9_]+)$/.test(str);

const duplicates = (array, property) => array
    .map(i => i[property])
    .map((e, i, final) => final.indexOf(e) !== i && i)
    .filter(obj => array[obj])
    .map(e => array[e][property]);

export const store = data => new Promise(async (resolve, reject) => {
    if (await idConflict(data)) {
        reject({
            status: 409,
            error: 'This id exists'
        });
    }


    const errors = [];

    const requiredFields = ['Title', 'Fields', 'Id'];
    requiredFields
        .filter(field => !hasRequired(data, field))
        .forEach(field => errors.push(`${field} is required`));

    if (data.fields) {
        const requiredFieldsOfFieldsItems = ['Name', 'Title', 'Type'];
        data.fields.forEach(item => {
                if (item.name && !isRawString(item.name)) {
                    errors.push(`Name in items of fields just can accept letters, numbers and underscore`)
                }

            if (item.options) {
                duplicates(item.options, 'value')
                    .forEach(value => errors.push(`${value} is duplicated in field ${item.name || ''} option (values should be uniq)`));
            }

                requiredFieldsOfFieldsItems
                    .filter(field => !hasRequired(item, field))
                    .forEach(field => errors.push(`${field} is required in items of fields`));
            }
        );

        duplicates(data.fields, 'name')
            .forEach(name => errors.push(`${name} is duplicated in field names (names should be uniq)`));
    }

    if (errors.length === 0) {
        resolve(data);
    } else {
        reject({error: errors});
    }
});

//////////////////////////////////////////////////////////////////

const misRequiredValues = (fields, data) =>
    fields
        .filter(i => i.required)
        .map(i => i.name)
        .filter(name => !data[name]);

const wrongNames = (fields, data) => {
    const fieldsNames = fields.map(i => i.name);
    return Object.keys(data).filter(n => !fieldsNames.includes(n))
};

const NaNs = (fields, data) =>
    fields
        .filter(i => i.type === 'Number')
        .map(i => i.name)
        .filter(n => !!data[n])
        .filter(n => isNaN(data[n]));

const wrongValueOptions = (fields, data) =>
    fields
        .filter(i => i.options)
        .map(i => ({
            name: i.name,
            values: i.options.map(o => o.value)
        }))
        .filter(i => !!data[i.name])
        .filter(i => !i.values.includes(data[i.name]));

export const log = (id, data) => new Promise(async (resolve, reject) => {
    const forms = await formData.read();
    const form = forms.find(i => parseInt(i.id) === parseInt(id));

    if (!form) {
        reject({
            status: 404,
            error: 'This id not exists'
        });
    } else {
        const fields = form.fields;
        const errors = [];

        misRequiredValues(fields, data)
            .forEach(name => errors.push(`${name} is required`));

        wrongNames(fields, data)
            .forEach(name => errors.push(`${name} is not in the form`));

        NaNs(fields, data)
            .forEach(name => errors.push(`${name} is not a number`));

        wrongValueOptions(fields, data)
            .forEach(({name, values}) => errors.push(`${name} only will get [${values}]`));

        if (errors.length === 0) {
            resolve(data);
        } else {
            reject({error: errors});
        }
    }
});

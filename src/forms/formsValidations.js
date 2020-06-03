import * as formData from './formData';

const hasRequired = (data, field) => !!data[field.toLocaleLowerCase()];

const idConflict = async (data) => {
    const forms = await formData.read();
    return !!forms.find(item => item.id === data.id)
};

const isRawString = str => /^([a-zA-Z0-9_]+)$/.test(str);

const duplicateName = fields => fields
    .map(i => i.name)
    .map((e, i, final) => final.indexOf(e) !== i && i)
    .filter(obj => fields[obj])
    .map(e => fields[e].name);

export default data => new Promise(async (resolve, reject) => {
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
                requiredFieldsOfFieldsItems
                    .filter(field => !hasRequired(item, field))
                    .forEach(field => errors.push(`${field} is required in items of fields`));
            }
        );

        duplicateName(data.fields)
            .forEach(name => errors.push(`${name} is duplicated`));
    }

    if (errors.length === 0) {
        resolve(data);
    } else {
        reject({error: errors});
    }
});

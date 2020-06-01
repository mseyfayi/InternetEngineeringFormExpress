import * as formData from './formData';

const hasRequired = (data, field) => !!data[field.toLocaleLowerCase()];

const idConflict = async (data) => {
    const forms = await formData.read();
    return !!forms.find(item => item.id === data.id)
};

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
        data.fields.forEach(item =>
            requiredFieldsOfFieldsItems
                .filter(field => !hasRequired(item, field))
                .forEach(field => errors.push(`${field} is required in items of fields`))
        );
    }

    if (errors.length === 0) {
        resolve(data);
    } else {
        reject({error: errors});
    }
});

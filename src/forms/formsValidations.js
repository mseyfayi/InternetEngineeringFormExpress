const hasRequired = (data, field) => !!data[field.toLocaleLowerCase()];

export default data => new Promise((resolve, reject) => {
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
        reject(errors);
    }
});
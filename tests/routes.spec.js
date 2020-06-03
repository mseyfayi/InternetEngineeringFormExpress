import request from "supertest";
import app from "../index";
import {clearForTest, readDBForTest} from "../src/repository";

const OLD_ENV = process.env;
let data;

beforeAll(done => {
    process.env = {...OLD_ENV};
    process.env.NODE_ENV = 'test';
    process.env.PORT = 8080;
    done()
});

afterAll(done => {
    process.env = OLD_ENV;
    app.close();
    done();
});

describe('Not Found URL', () => {
    it('should error with 404 status by get', async () => {
        const res = await request(app)
            .get('/notFound');
        expect(res.statusCode).toEqual(404);
    });

    it('should error with 404 status by post', async () => {
        const res = await request(app)
            .post('/notFound');
        expect(res.statusCode).toEqual(404);
    });

    it('should error with 404 status by put', async () => {
        const res = await request(app)
            .put('/notFound');
        expect(res.statusCode).toEqual(404);
    })
});

const noTitleData = {
    "id": "3",
    "fields": [
        {
            "name": "First_Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const noIdData = {
    "title": "A sample form",
    "fields": [
        {
            "name": "First_Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const noTitleNoIdData = {
    "fields": [
        {
            "name": "First_Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const noFieldsData = {
    "title": "A sample form",
    "id": "4",
};
const fieldsNoNameData = {
    "title": "A sample form",
    "id": "1",
    "fields": [
        {
            "title": "First Name",
            "type": "Text",
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        }
    ]
};
const fieldsNoTitleData = {
    "title": "A sample form",
    "id": "1",
    "fields": [
        {
            "name": "First_Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const fieldsNoTypeData = {
    "title": "A sample form",
    "id": "1",
    "fields": [
        {
            "name": "Loc",
            "title": "Your Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const fieldsNoTypeNoNameData1 = {
    "title": "A sample form",
    "id": "1",
    "fields": [
        {
            "title": "Your Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const fieldsNoTypeNoNameData2 = {
    "title": "A sample form",
    "id": "1",
    "fields": [
        {
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const emptyFieldData = {
    "title": "A sample form",
    "id": "3",
    "fields": []
};
const sampleData1 = {
    "title": "A sample form",
    "id": "2",
    "fields": []
};
const sampleData2 = {
    "title": "A sample form",
    "id": "2",
    "fields": []
};
const completeData = {
    "title": "A samp22le form",
    "id": "1",
    "fields": [
        {
            "name": "First_Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const fieldNameWithSpecialChar = {
    "title": "A samp22le form",
    "id": "1",
    "fields": [
        {
            "name": "First Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "Loc",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};
const duplicatedFieldName = {
    "title": "A samp22le form",
    "id": "1",
    "fields": [
        {
            "name": "First_Name",
            "title": "First Name",
            "type": "Text",
            "required": true
        },
        {
            "name": "First_Name",
            "title": "Your Location",
            "type": "Location",
            "required": false
        },

        {
            "name": "Request_Type",
            "title": "Request Type",
            "type": "Text",
            "options": [
                {"label": "Help", "value": "Help"},
                {"label": "Info", "value": "Information"}
            ]
        },
        {
            "name": "Base_Location",
            "title": "Base Location",
            "type": "Location",
            "options": [
                {"label": "Base1", "value": {"lat": "1.2", "long": "3.2"}},
                {"label": "Base2", "value": {"lat": "2.3", "long": "1.434"}}
            ]
        }
    ]
};

describe('Post /api/forms', () => {
    it('should error without title', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(noTitleData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isTitleInErrors = response.data
            .map(item => item.toLocaleLowerCase().includes('title'))
            .reduce((a, b) => a || b, false);
        expect(isTitleInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error without id', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(noIdData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase().includes('id'))
            .reduce((a, b) => a || b, false);
        expect(isIdInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error without fields', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(noFieldsData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase().includes('fields'))
            .reduce((a, b) => a || b, false);
        expect(isIdInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error without title and id', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(noTitleNoIdData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isTitleInErrors = response.data
            .map(item => item.toLocaleLowerCase().includes('title'))
            .reduce((a, b) => a || b, false);
        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase().includes('id'))
            .reduce((a, b) => a || b, false);

        expect(isIdInErrors).toBe(true);
        expect(isTitleInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with fields without name', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldsNoNameData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('name') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        expect(isIdInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with fields without title', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldsNoTitleData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('title') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        expect(isIdInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with fields without type', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldsNoTypeData);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isIdInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('type') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        expect(isIdInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with fields without type and name in one item', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldsNoTypeNoNameData1);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isTypeInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('type') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        const isNameInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('name') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        expect(isTypeInErrors).toBe(true);
        expect(isNameInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with fields without type and name in separate items', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldsNoTypeNoNameData2);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isTypeInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('type') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        const isNameInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('name') && item.includes('items'))
            .reduce((a, b) => a || b, false);
        expect(isTypeInErrors).toBe(true);
        expect(isNameInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with special field name', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(fieldNameWithSpecialChar);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isLetterInErrors = response.data
            .map(item => item.toLocaleLowerCase())
            .map(item => item.includes('name') && item.includes('letter'))
            .reduce((a, b) => a || b, false);

        expect(isLetterInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should error with duplicated field name', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(duplicatedFieldName);
        expect(res.statusCode).toEqual(422);

        const response = JSON.parse(res.text);
        expect(!!response.data).toBe(true);

        const isDuplicatedInErrors = response.data
            .map(item => item.includes('First_Name') && item.includes('duplicated'))
            .reduce((a, b) => a || b, false);

        expect(isDuplicatedInErrors).toBe(true);

        data = await readDBForTest();
        expect(data.length).toBe(0);
    });
    it('should be fine with empty fields', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(emptyFieldData);
        expect(res.statusCode).toEqual(200);

        data = await readDBForTest();
        expect(data.length).toBe(1);
    });
    it('should error 409(conflict) for exiting id', async () => {
        await clearForTest();

        const res1 = await request(app)
            .post('/api/forms')
            .send(sampleData1);
        expect(res1.statusCode).toEqual(200);

        data = await readDBForTest();
        expect(data.length).toBe(1);

        const res2 = await request(app)
            .post('/api/forms')
            .send(sampleData2);
        expect(res2.statusCode).toEqual(409);

        data = await readDBForTest();
        expect(data.length).toBe(1);
    });
    it('should be fine with complete fields', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(completeData);
        expect(res.statusCode).toEqual(200);

        const response = JSON.parse(res.text);
        expect(response.message).toBe('A samp22le form successfully added');

        data = await readDBForTest();
        expect(data.length).toBe(1);
    });
    it('should store multiple forms', async () => {
        await clearForTest();

        const res1 = await request(app)
            .post('/api/forms')
            .send(emptyFieldData);
        expect(res1.statusCode).toEqual(200);

        const res2 = await request(app)
            .post('/api/forms')
            .send(sampleData1);
        expect(res2.statusCode).toEqual(200);

        const res3 = await request(app)
            .post('/api/forms')
            .send(completeData);
        expect(res3.statusCode).toEqual(200);

        data = await readDBForTest();
        expect(data.length).toBe(3);
        expect(data).toMatchObject([emptyFieldData, sampleData1, completeData])
    });
});

describe('Get /api/forms', () => {
    it('should respond 200', async () => {
        const res = await request(app)
            .get('/api/forms');
        expect(res.statusCode).toEqual(200);
    });

    it('should respond properly', async () => {
        await clearForTest();

        await request(app).post('/api/forms').send(emptyFieldData);
        await request(app).post('/api/forms').send(sampleData1);
        await request(app).post('/api/forms').send(completeData);

        data = await readDBForTest();

        const res = await request(app)
            .get('/api/forms');

        const sentData = [emptyFieldData, sampleData1, completeData];
        const expectedData = sentData.map(item => ({title: item.title, id: item.id}));

        expect(res.statusCode).toEqual(200);
        const response = JSON.parse(res.text);
        expect(response.data).toEqual(expect.arrayContaining(expectedData))
    });
});

describe('Get /api/forms/{id}', () => {
    it('should respond 200', async () => {
        await clearForTest();

        await request(app).post('/api/forms').send(emptyFieldData);
        await request(app).post('/api/forms').send(sampleData1);
        await request(app).post('/api/forms').send(completeData);

        data = await readDBForTest();

        const res1 = await request(app)
            .get('/api/forms/3');
        expect(res1.statusCode).toEqual(200);
        const res2 = await request(app)
            .get('/api/forms/2');
        expect(res2.statusCode).toEqual(200);
        const res3 = await request(app)
            .get('/api/forms/1');
        expect(res3.statusCode).toEqual(200);

        const res4 = await request(app)
            .get('/api/forms/4');
        expect(res4.statusCode).toEqual(404);

    });
});


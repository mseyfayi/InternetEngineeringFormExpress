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

describe('Post /api/forms', () => {
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

    const noFieldsData = {
        "title": "A sample form",
        "id": "4",
    };
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

    const emptyFieldData = {
        "title": "A sample form",
        "id": "3",
        "fields": []
    };
    it('should be fine with empty fields', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(emptyFieldData);
        expect(res.statusCode).toEqual(200);

        data = await readDBForTest();
        expect(data.length).toBe(1);
    });

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
    it('should be fine with complete fields', async () => {
        await clearForTest();

        const res = await request(app)
            .post('/api/forms')
            .send(completeData);
        expect(res.statusCode).toEqual(200);

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
    it('should respond work completely', async () => {
        const res = await request(app)
            .get('/api/forms');
        expect(res.statusCode).toEqual(200);
    });
});

import request from "supertest";
import app from "../index";

beforeAll(done => {
    done()
});

afterAll(done => {
    app.close();
    done();
});


describe('Not Found', () => {
    it('should error with 404 status', async () => {
        const res = await request(app)
            .get('/notFound');
        expect(res.statusCode).toEqual(404);
    })
});

describe('Post /api/forms', () => {
    const completeData = {
        "title": "A sample form",
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
    const noFieldsData = {
        "title": "A sample form",
        "id": "4",
    };

    const emptyFieldData = {
        "title": "A sample form",
        "id": "2",
        "fields": []
    };
    it('should work with empty fields', async () => {
        const res = await request(app)
            .post('/api/forms')
            .send(emptyFieldData);
        expect(res.statusCode).toEqual(200);
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
    it('should error without title', async () => {
        const res = await request(app)
            .post('/api/forms')
            .send(noTitleData);
        expect(res.statusCode).toEqual(422);
    });
});

describe('Get /api/forms', () => {
    it('should respond work completely', async () => {
        const res = await request(app)
            .get('/api/forms');
        expect(res.statusCode).toEqual(200);
    });
});
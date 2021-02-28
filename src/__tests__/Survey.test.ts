import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';

describe("Survey", async ()=>{
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async ()=> {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new survey", async ()=> { 
        const response = await request(app).post("/surveys")
            .send({
                title: "test survey",
                description: "Test description example"
            })
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
    });

    it("It not should be able to get all surveys", async ()=> { 
        await request(app).get("/surveys")
            .send({
                email: "testtest@gmail.com",
                user: "User Teste 1"
            })

        const response = await request(app).get("/surveys")
        expect(response.body.length).toBe(2);
    });
})

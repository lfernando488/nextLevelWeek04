import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe("User", async ()=>{
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    })

    it("Should be able to create a new user", async ()=> { 
        const response = await request(app).post("/users")
            .send({
                email: "testeteste@gmail.com",
                user: "User Teste 1"
            })
            expect(response.status).toBe(201);
    })

    it("It not should be able to create a new user with exists email", async ()=> { 
        const response = await request(app).post("/users")
            .send({
                email: "testtest@gmail.com",
                user: "User Teste 1"
            })
            expect(response.status).toBe(400);
    })

})

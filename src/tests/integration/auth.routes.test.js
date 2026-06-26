import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../../server.js'

describe('auth routes - integration', () => {
    const testUser = {
        name: `Test-${Date.now()}`,
        email: `test_${Date.now()}@subledger.com`,
        password: 'Test1234!'
    }

    // POST /auth/register
    describe('POST /auth/register' , () => {
        it("should register a new user and return 200", async () => {
            const res = await request(app)
              .post('/auth/register')
              .send(testUser)

            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body).toHaveProperty("token")
            expect(res.body).toHaveProperty('user')
        })

        it('should return error if email already registered', async () => {
            await request(app)
              .post('/auth/register')
              .send(testUser)

            const res = await request(app)
              .post('/auth/register')
              .send(testUser)

            expect(res.status).toBe(500)
            expect(res.body.success).toBe(false)
            expect(res.body.message).toContain("already exist")
        })
    })

    // POST /auth/login
    describe('POST /auth/login', () => {
        it('should login and return token', async () => {
            await request(app)
             .post('/auth/register')
             .send(testUser)

            const res = await request(app)
               .post('/auth/login')
               .send({email: testUser.email , password: testUser.password})
            
            expect(res.status).toBe(200)
            expect(res.body.success).toBe(true)
            expect(res.body).toHaveProperty('token')
        })

        it('should return 200 with success: false for wrong password', async () => {
            await request(app)
             .post('/auth/register')
             .send(testUser)

             const res = await request(app)
                .post('/auth/login')
                .send({ email: testUser.email, password: 'WORNG_PASSWORD' })

            expect(res.body.success).toBe(false)
        })
    })
})
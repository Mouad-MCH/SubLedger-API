import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import app from '../../server.js'
import User from '../../models/User.models.js'
import { generateToken } from '../../utils/generateToken.js'

describe('POST /subscriptions - integration', () => {
    let token;
    let testUserId;

    beforeAll(async () => {
        const user = await User.create({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'hashedpassword'
        })
        testUserId = user._id.toString();
        token = generateToken(testUserId);
    })

    it('should create a subscription and return 201', async () => {
        const res = await request(app)
            .post('/subscription')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Basic Plan',
                price: 99.9,
                billingCycle: 'monthly'
            })

            expect(res.status).toBe(201)

            expect(res.body.success).toBe(true)
            expect(res.body.sub).toHaveProperty('_id')
            expect(res.body.sub.name).toBe('Basic Plan')
    })

    it('should return 401 if no token', async () => {
        const res = await request(app)
          .post('/subscription')
          .send({
            name: 'Basic',
            price: 99.9,
            billingCycle: 'monthly'
          })

        expect(res.status).toBe(401)
    })

})
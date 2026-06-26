import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createUserDB, loginUserDB } from '../../services/auth.service.js'

import User from '../../models/User.models.js'
import bcrypt from 'bcrypt'

vi.mock('../../models/User.models.js', () => ({
    default: {
        findOne: vi.fn(),
        create: vi.fn(),
    }
}))

vi.mock('bcrypt', () => ({
    default: {
        hash: vi.fn(),
        compare: vi.fn(),
    }
}))

vi.mock('../../utils/generateToken.js', () => ({
    generateToken: vi.fn(() => 'mock_token_123')
}))

describe('auth.service - unit tests', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    // createUserDB
    describe('createUserDB', () => {
        it('should throw if email already exists', async () => {
            User.findOne.mockResolvedValue({
                _id: 'abc',
                email: 'test@tese.com'
            })

            await expect(
                createUserDB({
                    email: 'test@test.com',
                    password: '123456'
                })
            ).rejects.toThrow('email is already exist')
        })

        it('should hash password before saving', async () => {
            User.findOne.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue('hashed_pw')
            User.create.mockResolvedValue({
                _id: 'u1',
                email: "new@test.com"
            })

            await createUserDB({
                email: 'new@test.com', password: 'plaintext'
            })

            expect(bcrypt.hash).toHaveBeenCalledWith('plaintext', 10)
        })

        it('should return user and token on success', async () => {
            User.findOne.mockResolvedValue(null)
            bcrypt.hash.mockResolvedValue('hasged_pw')
            User.create.mockResolvedValue({
                _id: 'u1',
                email: 'new@test.com',
            })

            const result = await createUserDB({
                email: 'new@test.com',
                password: "123"
            })

            expect(result).toHaveProperty('user')
            expect(result).toHaveProperty('token')
            expect(result.token).toBe('mock_token_123')
            
        })

        // loginUserDB
        describe('loginUserDB', () => {
            it('should return success: false if user not found', async () => {
                User.findOne.mockResolvedValue(null)

                const result = await loginUserDB('notfound@test.com', 'anypass')
                expect(result.success).toBe(false)
                expect(result.message).toContain('invaled')
            })

            it('should return success: false if password is wrong', async () => {
                User.findOne.mockResolvedValue({
                    _id: 'u1',
                    password: 'hashed_pw'
                })
                bcrypt.compare.mockResolvedValue(false)

                const result = await loginUserDB('test@test.com', 'wrongpass')

                expect(result.success).toBe(false)
            })

            it('should return token on valid credentials', async () => {
                User.findOne.mockResolvedValue({
                    _id: 'u1',
                    password: 'hashed_pw'
                })
                bcrypt.compare.mockResolvedValue(true)

                const result = await loginUserDB('test@test.com', 'correctpass')

                expect(result.success).toBe(true)
                expect(result.token).toBe('mock_token_123')
                expect(result.message).toBe('user is logged')
            })
        })
    })
})
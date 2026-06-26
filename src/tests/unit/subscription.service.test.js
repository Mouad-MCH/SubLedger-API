import { describe, it, expect, vi, beforeEach } from "vitest";
import { createSubscriptionDB, getSubscriptionDB, deleteSubscriptionDB } from "../../services/subscription.service.js";
import Subscription from "../../models/Subscription.models.js";


vi.mock('../../models/Subscription.models.js', () => ({
    default: {
        create: vi.fn(),
        find: vi.fn(),
        findOneAndDelete: vi.fn(),
    }
}))


describe('subscription.service - unit tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    describe('createSubscriptionDB', () => {
        it('should call Subscription.create with correct data', async () => {
            const mockData = {
                name: "Basic",
                price: 9.99,
                billingCycle: 'monthly',
                userId: '123'
            }

            const mockResult = { _id: 'abc', ...mockData }

            Subscription.create.mockResolvedValue(mockResult);

            const result = await createSubscriptionDB(mockData);

            expect(Subscription.create).toHaveBeenCalledWith(mockData);
            expect(result).toEqual(mockResult)
        })

        it('should throw error if subscription.create fails', async () => {
            Subscription.create.mockRejectedValue(new Error('DB error'));

            await expect(createSubscriptionDB({})).rejects.toThrow('DB error')
        })
    })
})
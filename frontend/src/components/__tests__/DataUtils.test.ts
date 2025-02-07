// src/utils/__tests__/dateUtils.test.ts
import { calculateDaysUntilBirthday } from '../dateUtils'

describe('calculateDaysUntilBirthday', () => {
    beforeAll(() => {
        // Mock the current date
        jest.useFakeTimers()
        jest.setSystemTime(new Date('2024-02-06'))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    it('returns "N/A" for empty date', () => {
        expect(calculateDaysUntilBirthday('')).toBe('N/A')
    })

    it('calculates days until next birthday correctly', () => {
        expect(calculateDaysUntilBirthday('2000-03-15')).toBe('38')
    })

    it('handles birthday today', () => {
        expect(calculateDaysUntilBirthday('2000-02-06')).toBe('0')
    })

    it('calculates days for birthday that passed this year', () => {
        expect(calculateDaysUntilBirthday('2000-01-01')).toBe('330')
    })
})
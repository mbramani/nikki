import { isDateValid } from '../../../src/utils/functions/index.js'

describe('function isDateValid', () => {
  describe('should return true', () => {
    it('if date is valid and function params are integer', () => {
      const booleanValue = isDateValid({ year: 2023, month: 1, day: 11 })
      expect(booleanValue).toBe(true)
    })

    it('if date is valid and function params are string', () => {
      const booleanValue = isDateValid({ year: '2023', month: '01', day: '11' })
      expect(booleanValue).toBe(true)
    })

    it('if date is 29 february for leap year', () => {
      const booleanValue = isDateValid({ year: 2024, month: 2, day: 29 })
      expect(booleanValue).toBe(true)
    })
  })

  describe('should return false', () => {
    it('if date is invalid and function params are integer', () => {
      const booleanValue = isDateValid({ year: 2023, month: 1, day: 32 })
      expect(booleanValue).toBe(false)
    })

    it('if date is invalid and function params are string', () => {
      const booleanValue = isDateValid({ year: '2023', month: '01', day: '32' })
      expect(booleanValue).toBe(false)
    })

    it('if month is invalid', () => {
      const booleanValue = isDateValid({ year: 2023, month: 13, day: 30 })
      expect(booleanValue).toBe(false)
    })

    it('if date is 29 february for non leap year', () => {
      const booleanValue = isDateValid({ year: 2023, month: 2, day: 29 })
      expect(booleanValue).toBe(false)
    })
  })
})

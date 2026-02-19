import { sanitizeInput, validateEmail, validatePassword } from '@/utils/security';

describe('Security Utils', () => {
  describe('sanitizeInput', () => {
    it('removes whitespace and limits length', () => {
      const input = '  test input  ';
      const result = sanitizeInput(input);
      
      expect(result).toBe('test input');
    });

    it('handles null and undefined', () => {
      expect(sanitizeInput(null as any)).toBe('');
      expect(sanitizeInput(undefined as any)).toBe('');
    });

    it('limits input length to 1000 characters', () => {
      const longInput = 'a'.repeat(2000);
      const result = sanitizeInput(longInput);
      
      expect(result.length).toBeLessThanOrEqual(1000);
    });

    it('preserves safe text', () => {
      const input = 'Hello World 123!';
      const result = sanitizeInput(input);
      
      expect(result).toBe(input);
    });
  });

  describe('Email Validation', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@example.co.uk')).toBe(true);
      expect(validateEmail('test+tag@example.com')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('invalid @example.com')).toBe(false);
    });

    it('rejects emails longer than 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(validateEmail(longEmail)).toBe(false);
    });

    it('handles empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('Password Validation', () => {
    it('accepts strong passwords', () => {
      const result = validatePassword('Demo@12345');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('provides validation errors for weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects passwords shorter than 8 characters', () => {
      const result = validatePassword('Demo@12');
      expect(result.valid).toBe(false);
      expect(result.errors.some(e => e.includes('characters'))).toBe(true);
    });

    it('rejects passwords without required character types', () => {
      const result = validatePassword('demo@12345');
      expect(result.valid).toBe(false);
    });

    it('rejects empty password', () => {
      const result = validatePassword('');
      expect(result.valid).toBe(false);
    });
  });
});

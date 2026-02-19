import { validateEmail, validatePassword } from '@/utils/security';

describe('Authentication Validation', () => {
  describe('Email Validation', () => {
    it('accepts valid email format', () => {
      const validEmails = [
        'user@example.com',
        'test.user@example.co.uk',
        'user+tag@example.com',
        'user_123@example.com',
      ];

      validEmails.forEach(email => {
        expect(validateEmail(email)).toBe(true);
      });
    });

    it('rejects invalid email format', () => {
      const invalidEmails = [
        'invalid',
        'invalid@',
        '@example.com',
        'invalid @example.com',
        'invalid@example',
      ];

      invalidEmails.forEach(email => {
        expect(validateEmail(email)).toBe(false);
      });
    });

    it('rejects email longer than 254 characters', () => {
      const longEmail = 'a'.repeat(250) + '@example.com';
      expect(validateEmail(longEmail)).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('   ')).toBe(false);
      expect(validateEmail(null as any)).toBe(false);
    });
  });

  describe('Password Strength Validation', () => {
    it('accepts strong passwords', () => {
      const strongPasswords = [
        'Demo@12345',
        'SecurePass123!',
        'MyPassword@2024',
        'Tropical@Vibe9',
        'Strong@Pass1',
      ];

      strongPasswords.forEach(password => {
        const result = validatePassword(password);
        if (!result.valid) {
          console.log(`Password "${password}" failed validation:`, result.errors);
        }
        expect(result.valid).toBe(true);
      });
    });

    it('provides error messages for weak passwords', () => {
      const result = validatePassword('weak');
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('rejects password without uppercase', () => {
      const result = validatePassword('demo@12345');
      expect(result.valid).toBe(false);
    });

    it('rejects password without lowercase', () => {
      const result = validatePassword('DEMO@12345');
      expect(result.valid).toBe(false);
    });

    it('rejects password without number', () => {
      const result = validatePassword('Demo@abcde');
      expect(result.valid).toBe(false);
    });

    it('rejects password without special character', () => {
      const result = validatePassword('Demo12345');
      expect(result.valid).toBe(false);
    });

    it('rejects password shorter than 8 characters', () => {
      const result = validatePassword('Demo@12');
      expect(result.valid).toBe(false);
    });

    it('rejects empty password', () => {
      const result = validatePassword('');
      expect(result.valid).toBe(false);
    });

    it('accepts various special characters', () => {
      const validPasswords = [
        'Pass@123',
        'Pass$123',
        'Pass!123',
        'Pass%123',
        'Pass*123',
        'Pass?123',
        'Pass&123',
      ];

      validPasswords.forEach(password => {
        const result = validatePassword(password);
        expect(result.valid).toBe(true);
      });
    });
  });

  describe('Duplicate Email Prevention', () => {
    it('should identify duplicate emails', () => {
      const emails = ['user@example.com', 'another@example.com', 'user@example.com'];
      const uniqueEmails = new Set(emails.map(e => e.toLowerCase()));
      
      expect(uniqueEmails.size).toBe(2); // Should have 2 unique emails
    });
  });
});

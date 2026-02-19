import { createToken, verifyToken } from '@/utils/jwt';

describe('JWT Utils', () => {
  describe('createToken', () => {
    it('creates a valid JWT token', async () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = await createToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3);
    });

    it('sets correct expiration time', async () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = await createToken(payload);
      const decoded = await verifyToken(token);

      expect(decoded).toBeDefined();
      expect(decoded?.exp).toBeDefined();
    });

    it('includes payload in token', async () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = await createToken(payload);
      const decoded = await verifyToken(token);

      expect(decoded?.userId).toBe('123');
      expect(decoded?.email).toBe('test@example.com');
    });
  });

  describe('verifyToken', () => {
    it('verifies a valid token', async () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = await createToken(payload);
      const result = await verifyToken(token);

      expect(result).not.toBeNull();
      expect(result?.userId).toBe('123');
    });

    it('returns null for invalid token', async () => {
      const result = await verifyToken('invalid.token.here');

      expect(result).toBeNull();
    });

    it('returns payload with correct structure', async () => {
      const payload = { userId: '123', email: 'test@example.com' };
      const token = await createToken(payload);
      const decoded = await verifyToken(token);

      expect(decoded).toHaveProperty('userId');
      expect(decoded).toHaveProperty('email');
      expect(decoded).toHaveProperty('iat');
      expect(decoded).toHaveProperty('exp');
    });
  });
});

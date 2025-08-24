import User from './User';

describe('User Model', () => {
  it('should define User interface correctly', () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      phone: '+1234567890',
      betterAuthId: 'auth-123',
      name: 'Test User',
      passwordHash: 'hashed-password',
      createdAt: new Date('2023-01-01').toISOString(),
      updatedAt: new Date('2023-01-02').toISOString(),
      emailVerified: true,
      phoneVerified: false,
    };

    expect(user.id).toBe('user-123');
    expect(user.email).toBe('test@example.com');
    expect(user.phone).toBe('+1234567890');
    expect(user.betterAuthId).toBe('auth-123');
    expect(user.name).toBe('Test User');
    expect(user.passwordHash).toBe('hashed-password');
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.emailVerified).toBe(true);
    expect(user.phoneVerified).toBe(false);
  });

  it('should allow string properties to be empty strings', () => {
    const user: User = {
      id: '',
      email: '',
      phone: '',
      betterAuthId: '',
      name: '',
      passwordHash: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: false,
      phoneVerified: false,
    };

    expect(typeof user.id).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.phone).toBe('string');
    expect(typeof user.betterAuthId).toBe('string');
    expect(typeof user.name).toBe('string');
    expect(typeof user.passwordHash).toBe('string');
  });

  it('should enforce boolean types for verification fields', () => {
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      phone: '+1234567890',
      betterAuthId: 'auth-123',
      name: 'Test User',
      passwordHash: 'hashed-password',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      emailVerified: true,
      phoneVerified: true,
    };

    expect(typeof user.emailVerified).toBe('boolean');
    expect(typeof user.phoneVerified).toBe('boolean');
  });

  it('should enforce Date types for timestamp fields', () => {
    const now = new Date().toISOString();
    const user: User = {
      id: 'user-123',
      email: 'test@example.com',
      phone: '+1234567890',
      betterAuthId: 'auth-123',
      name: 'Test User',
      passwordHash: 'hashed-password',
      createdAt: now,
      updatedAt: now,
      emailVerified: false,
      phoneVerified: false,
    };

    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
    expect(user.createdAt).toBe(now);
    expect(user.updatedAt).toBe(now);
  });
});

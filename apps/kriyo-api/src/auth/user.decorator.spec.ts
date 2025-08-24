import { AuthUser } from './user.decorator';

describe('AuthUser Interface', () => {
  it('should define AuthUser interface correctly', () => {
    const user: AuthUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    expect(user.id).toBe('user-123');
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
  });

  it('should allow string properties', () => {
    const user: AuthUser = {
      id: '',
      email: '',
      name: '',
    };

    expect(typeof user.id).toBe('string');
    expect(typeof user.email).toBe('string');
    expect(typeof user.name).toBe('string');
  });

  it('should enforce required fields', () => {
    const user: AuthUser = {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    // This test passes by compilation - if any required field is missing,
    // TypeScript would throw a compilation error
    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.name).toBeDefined();
  });
});

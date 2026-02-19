import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/lib/application/stores/authStore';

describe('Auth Store', () => {
  beforeEach(() => {
    // Reset store before each test
    const store = useAuthStore.getState();
    store.logout();
  });

  it('initializes with no user', () => {
    const { result } = renderHook(() => useAuthStore());
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('sets user on login', () => {
    const { result } = renderHook(() => useAuthStore());
    
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('clears user on logout', () => {
    const { result } = renderHook(() => useAuthStore());
    
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.isAuthenticated).toBe(true);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('updates user information', () => {
    const { result } = renderHook(() => useAuthStore());
    
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    const updatedUser = {
      ...mockUser,
      firstName: 'Jane',
    };

    act(() => {
      result.current.setUser(updatedUser);
    });

    expect(result.current.user?.firstName).toBe('Jane');
  });

  it('persists user data across store instances', () => {
    const { result: result1 } = renderHook(() => useAuthStore());
    
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    act(() => {
      result1.current.setUser(mockUser);
    });

    const { result: result2 } = renderHook(() => useAuthStore());
    
    expect(result2.current.user).toEqual(mockUser);
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Header } from '@/lib/presentation/components/Header';
import { useAuthStore } from '@/lib/application/stores/authStore';
import { useCartStore } from '@/lib/application/stores/cartStore';
import { useLogout } from '@/lib/presentation/hooks/useAuth';

// Mock Next.js Link and router
jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const { variants, initial, animate, whileInView, viewport, whileHover, whileTap, transition, ...restProps } = props;
      return <div {...restProps}>{children}</div>;
    },
    a: ({ children, ...props }: any) => {
      const { variants, initial, animate, whileInView, viewport, whileHover, whileTap, transition, ...restProps } = props;
      return <a {...restProps}>{children}</a>;
    },
    button: ({ children, ...props }: any) => {
      const { variants, initial, animate, whileInView, viewport, whileHover, whileTap, transition, ...restProps } = props;
      return <button {...restProps}>{children}</button>;
    },
  },
}));

// Mock the auth store
jest.mock('@/lib/application/stores/authStore');
jest.mock('@/lib/application/stores/cartStore');
jest.mock('@/lib/presentation/hooks/useAuth');

describe('Header Component', () => {
  const mockUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;
  const mockUseCartStore = useCartStore as jest.MockedFunction<typeof useCartStore>;
  const mockUseLogout = useLogout as jest.MockedFunction<typeof useLogout>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLogout.mockReturnValue({ mutate: jest.fn() } as any);
  });

  it('renders logo and navigation links', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    render(<Header />);

    expect(screen.getByText(/✨ AROMA/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /products/i }).length).toBeGreaterThan(0);
  });

  it('shows login and register buttons when not authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    render(<Header />);

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  it('shows user name and logout button when authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      isAuthenticated: true,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    render(<Header />);

    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('calls logout when logout button is clicked', async () => {
    const mockLogoutMutate = jest.fn();
    mockUseLogout.mockReturnValue({ mutate: mockLogoutMutate } as any);
    mockUseAuthStore.mockReturnValue({
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      },
      isAuthenticated: true,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    render(<Header />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(mockLogoutMutate).toHaveBeenCalled();
    });
  });

  it('renders navigation menu', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    render(<Header />);

    expect(screen.getAllByRole('link', { name: /products/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
  });

  it('renders cart icon link', () => {
    mockUseAuthStore.mockReturnValue({
      user: null,
      isAuthenticated: false,
      setUser: jest.fn(),
      logout: jest.fn(),
    } as any);
    mockUseCartStore.mockReturnValue({
      getItemCount: jest.fn(() => 0),
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      getTotal: jest.fn(),
    } as any);

    const { container } = render(<Header />);
    
    const cartLink = screen.getByRole('link', { name: '' }).parentElement?.querySelector('svg');
    expect(cartLink).toBeInTheDocument();
  });
});

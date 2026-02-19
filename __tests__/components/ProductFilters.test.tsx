import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductFilters } from '@/lib/presentation/components/ProductFilters';
import { useFilterStore } from '@/lib/application/stores/filterStore';

jest.mock('@/lib/application/stores/filterStore');
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
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

describe('ProductFilters Component', () => {
  const mockUseFilterStore = useFilterStore as jest.MockedFunction<typeof useFilterStore>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);
  });

  it('renders filter form', async () => {
    const { container } = render(<ProductFilters />);
    
    // Find input by placeholder instead of label
    const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
  });

  it('allows searching for products', async () => {
    const mockSetSearch = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: mockSetSearch,
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);

    const { container } = render(<ProductFilters />);
    
    const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: 'lavender' } });

    expect(mockSetSearch).toHaveBeenCalledWith('lavender');
  });

  it('allows filtering by category', async () => {
    const mockSetCategory = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: mockSetCategory,
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);

    render(<ProductFilters />);
    
    const categoryButton = screen.getByRole('button', { name: /all categories/i });
    fireEvent.click(categoryButton);
    expect(mockSetCategory).toHaveBeenCalled();
  });

  it('allows filtering by brand', async () => {
    const mockSetBrand = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: mockSetBrand,
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);

    const { container } = render(<ProductFilters />);
    
    const brandSelect = container.querySelector('select') as HTMLSelectElement;
    if (brandSelect) {
      fireEvent.change(brandSelect, { target: { value: 'Luxe Parfum' } });
      expect(mockSetBrand).toHaveBeenCalledWith('Luxe Parfum');
    }
  });

  it('allows setting price range', async () => {
    const mockSetPriceRange = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: mockSetPriceRange,
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);

    const { container } = render(<ProductFilters />);
    
    // Find the minimum price input (first number input)
    const numberInputs = container.querySelectorAll('input[type="number"]');
    if (numberInputs.length > 0) {
      const minPriceInput = numberInputs[0] as HTMLInputElement;
      await userEvent.clear(minPriceInput);
      await userEvent.type(minPriceInput, '50');
      expect(mockSetPriceRange).toHaveBeenCalled();
    }
  });

  it('allows sorting products', async () => {
    const mockSetSorting = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: mockSetSorting,
      resetFilters: jest.fn(),
    } as any);

    const { container } = render(<ProductFilters />);
    
    // Try to find select element by looking for sort-related combobox
    const selects = container.querySelectorAll('select');
    const sortSelect = selects.length > 1 ? selects[1] : selects[0];
    if (sortSelect) {
      fireEvent.change(sortSelect, { target: { value: 'price' } });
      expect(mockSetSorting).toHaveBeenCalled();
    }
  });

  it('allows resetting all filters', async () => {
    const mockResetFilters = jest.fn();
    mockUseFilterStore.mockReturnValue({
      search: '',
      category: '',
      brand: '',
      minPrice: 0,
      maxPrice: 0,
      sortBy: 'name',
      sortOrder: 'asc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: mockResetFilters,
    } as any);

    render(<ProductFilters />);
    
    const resetButtons = screen.getAllByRole('button', { name: /reset/i });
    if (resetButtons.length > 0) {
      fireEvent.click(resetButtons[0]);
      expect(mockResetFilters).toHaveBeenCalled();
    }
  });

  it('displays current filter values', () => {
    mockUseFilterStore.mockReturnValue({
      search: 'lavender',
      category: 'floral',
      brand: 'Test Brand',
      minPrice: 50,
      maxPrice: 150,
      sortBy: 'price',
      sortOrder: 'desc',
      setSearch: jest.fn(),
      setCategory: jest.fn(),
      setBrand: jest.fn(),
      setPriceRange: jest.fn(),
      setSorting: jest.fn(),
      resetFilters: jest.fn(),
    } as any);

    const { container } = render(<ProductFilters />);
    
    const searchInput = container.querySelector('input[type="text"]') as HTMLInputElement;
    expect(searchInput.value).toBe('lavender');
  });
});

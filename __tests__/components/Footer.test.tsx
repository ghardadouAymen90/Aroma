import { render, screen } from '@testing-library/react';
import { Footer } from '@/lib/presentation/components/Footer';

jest.mock('next/link', () => {
  return ({ children, href }: any) => {
    return <a href={href}>{children}</a>;
  };
});

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

describe('Footer Component', () => {
  it('renders footer with company info', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });

  it('displays social media links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument();
  });

  it('includes quick links section', () => {
    render(<Footer />);
    
    expect(screen.getByText(/quick links/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  });

  it('displays copyright information', () => {
    render(<Footer />);
    
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`©.*${year}.*AROMA`, 'i'))).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
  });

  it('includes customer service section', () => {
    render(<Footer />);
    
    expect(screen.getByText(/customer service/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument();
  });

  it('has proper semantic structure', () => {
    const { container } = render(<Footer />);
    
    const footer = container.querySelector('footer');
    expect(footer).toBeInTheDocument();
  });
});

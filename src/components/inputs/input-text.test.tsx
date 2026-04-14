import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InputText } from './input-text';

describe('InputText', () => {
  it('renders label associated with the control', () => {
    render(<InputText name="title" label="Título" />);
    const input = screen.getByRole('textbox', { name: 'Título' });
    expect(input).toHaveAttribute('id', 'title');
    expect(input).toHaveAttribute('name', 'title');
  });

  it('shows validation error text', () => {
    render(<InputText name="x" label="Campo" error="Obrigatório" />);
    expect(screen.getByText('Obrigatório')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows helper text when there is no error', () => {
    render(<InputText name="x" label="Campo" helperText="Dica" />);
    expect(screen.getByText('Dica')).toBeInTheDocument();
  });
});

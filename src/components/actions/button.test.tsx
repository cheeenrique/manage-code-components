import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button type="button">Salvar</Button>);
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(
      <Button type="button" loading>
        Aguarde
      </Button>,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

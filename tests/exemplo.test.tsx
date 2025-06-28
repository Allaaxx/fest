import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Exemplo de teste', () => {
  it('deve renderizar o texto corretamente', () => {
    render(<div>Olá, mundo!</div>);
    expect(screen.getByText('Olá, mundo!')).toBeInTheDocument();
  });

  it('deve garantir que o Jest está configurado corretamente', () => {
    expect(true).toBe(true);
  });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockHandlePageChange = jest.fn();

  it('renders pagination buttons correctly', () => {
    render(
      <Pagination page={2} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables "Previous" button on the first page', () => {
    render(
      <Pagination page={1} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByText('Previous')).toBeDisabled();
  });

  it('disables "Next" button on the last page', () => {
    render(
      <Pagination page={5} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('calls handlePageChange with correct page number when a page button is clicked', () => {
    render(
      <Pagination page={2} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    fireEvent.click(screen.getByText('3'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(3);
  });

  it('calls handlePageChange with correct page number when "Previous" button is clicked', () => {
    render(
      <Pagination page={3} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    fireEvent.click(screen.getByText('Previous'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(2);
  });

  it('calls handlePageChange with correct page number when "Next" button is clicked', () => {
    render(
      <Pagination page={3} totalPages={5} handlePageChange={mockHandlePageChange} />
    );

    fireEvent.click(screen.getByText('Next'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(4);
  });

  it('disables clicked page button', () => {
    render(
      <Pagination page={3} totalPages={5} handlePageChange={mockHandlePageChange} />
    );
     expect(screen.getByText('3')).toBeDisabled();
  });

});
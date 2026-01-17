import { useState, useCallback } from 'react';
import type { Book } from '../types/pricing';
import { pricingConfig } from '../config/pricing';

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createDefaultBook(): Book {
  return {
    id: generateId(),
    pages: pricingConfig.serviceInfo.defaultPages,
    ocr: false,
    highRes: false,
    tocCount: pricingConfig.serviceInfo.defaultTocCount,
    binding: false,
  };
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([createDefaultBook()]);

  const addBook = useCallback(() => {
    setBooks(prev => [...prev, createDefaultBook()]);
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks(prev => {
      if (prev.length <= 1) return prev; // 최소 1개 유지
      return prev.filter(book => book.id !== id);
    });
  }, []);

  const updateBook = useCallback((id: string, updates: Partial<Book>) => {
    setBooks(prev =>
      prev.map(book =>
        book.id === id ? { ...book, ...updates } : book
      )
    );
  }, []);

  const resetBooks = useCallback(() => {
    setBooks([createDefaultBook()]);
  }, []);

  return {
    books,
    addBook,
    removeBook,
    updateBook,
    resetBooks,
  };
}

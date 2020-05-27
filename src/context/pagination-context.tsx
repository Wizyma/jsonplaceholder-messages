import React from 'react';
import { createContext, useContext, useState, useCallback } from 'react';

type Pagination = { page: number; limit: number; count: number };

const PaginationContext = createContext<{
  pagination: Pagination;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
  setCount: (count: number) => void;
}>({
  pagination: { page: 1, limit: 10, count: 0 },
  onChangePage: () => {},
  onChangeLimit: () => {},
  setCount: () => {},
});

export default function PaginationProvider({ children }: { children: React.ReactNode }) {
  const [pagination, setPagination] = useState<{ page: number; limit: number; count: number }>({
    page: 1,
    limit: 10,
    count: 0,
  });

  const setCount = useCallback(
    (count: number) => {
      return setPagination({
        ...pagination,
        count,
      });
    },
    [setPagination, pagination],
  );

  const onChangePage = useCallback(
    (page: number) => {
      if (page < 1) {
        throw new Error('the current page cannot be inferior to 1');
      }

      return setPagination({
        ...pagination,
        page,
      });
    },
    [setPagination, pagination],
  );

  const onChangeLimit = useCallback(
    (limit: number) => {
      return setPagination({
        ...pagination,
        limit,
      });
    },
    [setPagination, pagination],
  );

  return (
    <PaginationContext.Provider value={{ pagination, onChangePage, onChangeLimit, setCount }}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const pagination = useContext(PaginationContext);

  if (pagination === undefined) {
    throw new Error('usePaginationContext must be used within a PaginationContext.Provider');
  }

  return pagination;
}

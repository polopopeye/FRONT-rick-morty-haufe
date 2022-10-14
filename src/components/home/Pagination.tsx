import React from 'react';
import { useSelector } from 'react-redux';
import {
  characterSlice,
  listCharacters,
} from '../../app/slices/charactersSlice';
import { RootState, store } from '../../app/store';
import { InnerContainer } from '../commons';

const Pagination = () => {
  const { currentPagination } = useSelector(
    (state: RootState) => state.character
  );

  const [currentPage, setCurrentPage] = React.useState(currentPagination);
  const [totalPages] = React.useState(43);

  store.subscribe(() => {
    const { currentPagination } = store.getState().character;
    setCurrentPage(currentPagination);
  });

  return (
    <InnerContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button
          disabled={currentPage === 1}
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              store.dispatch(listCharacters({ page: currentPage - 1 }));
              store.dispatch(
                characterSlice.actions.setCurrentPagination(currentPage - 1)
              );
            }
          }}
        >
          Prev
        </button>

        {Array.from(Array(totalPages).keys()).map((page) => {
          if (page === 0) {
            return null;
          }
          if (page === currentPage) {
            return (
              <span
                key={page}
                style={{
                  padding: '0.5em',
                }}
              >
                {page}
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                store.dispatch(listCharacters({ page }));
                store.dispatch(
                  characterSlice.actions.setCurrentPagination(page)
                );
              }}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={
            currentPage === totalPages || currentPage === totalPages - 1
          }
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
              store.dispatch(listCharacters({ page: currentPage + 1 }));
              store.dispatch(
                characterSlice.actions.setCurrentPagination(currentPage + 1)
              );
            }
          }}
        >
          Next
        </button>
      </div>
    </InnerContainer>
  );
};

export default Pagination;

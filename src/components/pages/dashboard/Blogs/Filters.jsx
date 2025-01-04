import React from 'react';
import { SelectListGroup } from '@/components/ui/form/SelectListGroup';
import { Select } from '@/components/ui/select';

import Image from 'next/image';
import { TextFieldGroup } from '@/components/ui/form/TextFieldGroup';

export const Filters = ({
  router,
  debouncedRouterPush,
  perpage,
  setPerPage,
  authors,
  selectedAuthor,
  setSelectedAuthor,
  dispatch,
}) => {
  return (
    <div className="listings-pg_filters">
      <h2 className="heading-2 filters-label_main">Filters</h2>

      <div className="per-page">
        <h3 className="heading-3 filters-label">Per Page</h3>

        <SelectListGroup
          value={perpage}
          onChange={(selectedOption) => {
            const newQuery = {
              ...router.query,
              page: 1,
            };

            const numericValue = Number(selectedOption.value);
            setPerPage(numericValue);
            newQuery.perpage = numericValue;
            debouncedRouterPush(newQuery);
          }}
          options={[
            { label: '8', value: 8 },
            { label: '12', value: 12 },
            { label: '16', value: 16 },
          ]}
          name="perpage"
          id="perpage"
          classes="perpage-select"
        />
      </div>

      <div className="authors">
        <h3 className="heading-3 filters-label">Authors</h3>

        <SelectListGroup
          default_value={'All Authors'}
          value={selectedAuthor}
          onChange={(selectedOption) => {
            const newQuery = {
              ...router.query,
              page: 1,
            };

            if (
              selectedOption.target.value &&
              selectedOption.target.value !== '0'
            ) {
              setSelectedAuthor(parseInt(selectedOption.target.value));
              newQuery.author = selectedOption.target.value;
            } else {
              setSelectedAuthor('');
              delete newQuery.author;
            }

            debouncedRouterPush(newQuery);
          }}
          options={[
            { label: 'All Authors', value: '0' },
            ...authors?.map((author) => ({
              label: author.name,
              value: author.id,
              selected: author.id === selectedAuthor ? true : undefined,
            })),
          ]}
          name="author"
          id="author"
          classes="author-select"
        />
      </div>

      <button
        className="btn btn-primary btn-primary-grad mt-12"
        onClick={() => {

          setPerPage(8);
          setSelectedAuthor('');

          router.push({
            pathname: '/admin/blog',
          });
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

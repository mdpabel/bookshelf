/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React, {useEffect} from 'react';
import * as colors from '../styles/colors';
import {FaSearch, FaTimes} from 'react-icons/fa';
import Tooltip from '@reach/tooltip';
import '@reach/tooltip/styles.css';
import {Input, Spinner} from '../components/lib';
import Book from '../components/Book';
import {client} from '../utils/api-client';
import {useAsync} from '../hooks/useAsync';
import {useFilter} from '../hooks/useFilter';

function Discover({user, token}) {
  const {run, data, error, isError, isLoading, isSuccess} = useAsync();
  const [query, setQuery] = React.useState('');
  const books = useFilter(data?.data, query);

  useEffect(() => {
    run(
      client(`books`, {
        token: user?.token,
      }),
    );
  }, [run, user?.token]);

  function handleSearch(event) {
    setQuery(event.target.value);
  }

  return (
    <div css={{margin: 'auto'}}>
      <form>
        <Input
          onChange={handleSearch}
          placeholder="Search books..."
          type="search"
          id="search"
          css={css`
            width: 100%;
          `}
        />

        <Tooltip
          css={css`
            position: relative;
            top: 0;
            margin-left: -35px;
          `}
          label="Search books"
          aria-label="Search books"
        >
          <label htmlFor="search">
            <button
              type="submit"
              css={css`
                position: relative;
                border: 0;
                background: transparent;
                margin-left: -35px;
              `}
            >
              {isError ? (
                <FaTimes css={{color: colors.danger}} />
              ) : isLoading ? (
                <Spinner />
              ) : (
                <FaSearch />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      <div>
        {isSuccess
          ? books?.map((book) => (
              <React.Fragment key={book._id}>
                <Book book={book} user={user} token={token} />
              </React.Fragment>
            ))
          : null}
      </div>
      <div>
        {books?.length <= 0 && isSuccess ? (
          <p
            css={css`
              color: ${colors.danger};
              margin-top: 1rem;
            `}
          >
            No Book Found with the searched value of {query}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default Discover;

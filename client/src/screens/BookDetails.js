/**@jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import BookPlaceHolder from '../assets/book-cover-placeholder.png';
import {useAsync} from '../hooks/useAsync';
import {client} from '../utils/api-client';
import * as colors from '../styles/colors';
import StatusButton from './../components/StatusButton';

const loadingBook = {
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: BookPlaceHolder,
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  pageCount: 'loading...',
  loadingBook: true,
};

const BookDetails = ({token}) => {
  const {id} = useParams();
  const {run, data} = useAsync();

  const {title, coverImageUrl, pageCount, publisher, synopsis, author} = data
    ? data?.data
    : loadingBook;

  useEffect(() => {
    run(client(`books/${id}`));
  }, [id, run]);

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-gap: 1rem;
        position: relative;
      `}
    >
      <div>
        <img width="100%" src={coverImageUrl} alt={title} />
      </div>
      <div
        css={css`
          font-size: 1rem;
          color: ${colors.text};
        `}
      >
        <h2>{title}</h2>
        <p>
          {author} | {publisher} | <span> Pages : {pageCount}</span>
        </p>
        <p>{synopsis}</p>
      </div>
      <div
        css={css`
          position: absolute;
          right: 10px;
        `}
      >
        <StatusButton token={token} bookId={id} />
      </div>
    </div>
  );
};

export default BookDetails;

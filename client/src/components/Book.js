/* eslint-disable no-unused-vars */
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';
import {Link} from 'react-router-dom';
import * as colors from '../styles/colors';
import * as mq from '../styles/media-query';
import StatusButton from './StatusButton';

const Book = ({book, token}) => {
  const {author, coverImageUrl, id, publisher, synopsis, title, _id} = book;

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        margin: '0.5rem 0',
      }}
    >
      <Link
        aria-labelledby={id}
        to={`/books/${_id}`}
        css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          textDecoration: 'none',

          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            css={{maxHeight: '100%', width: '100%'}}
          />
        </div>
        <div css={{flex: 1}}>
          <div css={{display: 'flex', justifyContent: 'space-between'}}>
            <div css={{flex: 1}}>
              <h2
                id={id}
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {title}
              </h2>
            </div>
            <div css={{marginLeft: 10}}>
              <div
                css={{
                  marginTop: '0.4em',
                  fontStyle: 'italic',
                  fontSize: '0.85em',
                }}
              >
                {author}
              </div>
              <small>{publisher}</small>
            </div>
          </div>
          <small css={{whiteSpace: 'break-spaces', display: 'block'}}>
            {synopsis?.substring(0, 500)}...
          </small>
        </div>
      </Link>
      <div
        css={css`
          position: absolute;
          right: -20px;
        `}
      >
        <StatusButton token={token} bookId={_id} />
      </div>
    </div>
  );
};

export default Book;

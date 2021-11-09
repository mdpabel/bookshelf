import Tooltip from '@reach/tooltip';
import React from 'react';
import {CircleButton, Spinner} from './lib';
import {FaPlusCircle, FaRegCheckCircle} from 'react-icons/fa';
import {BiError} from 'react-icons/bi';
import {useMutation} from 'react-query';
import {client} from '../utils/api-client';

function ToolTipButton({mutate, book, error, status, ...rest}) {
  function handleClick() {
    console.log(book);
  }

  return status === 'idle' ? (
    <Tooltip label="Add to list">
      <CircleButton aria-label="Add to list" onClick={handleClick} {...rest}>
        <FaPlusCircle />
      </CircleButton>
    </Tooltip>
  ) : status === 'loading' ? (
    <Tooltip label="Adding to the reading list">
      <CircleButton
        aria-label="Adding to the reading list"
        onClick={handleClick}
        {...rest}
      >
        <Spinner />
      </CircleButton>
    </Tooltip>
  ) : status === 'success' ? (
    <Tooltip label="Successfully added the book to reading list">
      <CircleButton
        style={{color: 'green'}}
        aria-label="Successfully added the book to reading list"
        onClick={handleClick}
        {...rest}
      >
        <FaRegCheckCircle />
      </CircleButton>
    </Tooltip>
  ) : status === 'error' ? (
    <Tooltip label={error?.data}>
      <CircleButton
        style={{color: 'red'}}
        aria-label="Success"
        onClick={handleClick}
        {...rest}
      >
        <BiError />
      </CircleButton>
    </Tooltip>
  ) : null;
}

const StatusButton = ({token, bookId}) => {
  const {data, error, mutate, status} = useMutation(() =>
    client('books/readingBook', {data: {bookId}, token: token, method: 'POST'}),
  );

  console.log('data ', error);

  return (
    <>
      <ToolTipButton
        error={error}
        status={status}
        bookId={bookId}
        onClick={() => mutate()}
      />
    </>
  );
};

export default StatusButton;

/**@jsxImportSource @emotion/react */
import styled from '@emotion/styled/macro';
import {keyframes, css} from '@emotion/react';
import {Dialog as ReachDialog} from '@reach/dialog';
import {FaSpinner} from 'react-icons/fa';

import * as colors from '../styles/colors';
import * as mq from '../styles/media-query';

const buttonVariants = {
  primary: {
    background: colors.indigo,
    color: colors.base,
  },
  secondary: {
    background: colors.gray,
    color: colors.text,
  },
};

const Button = styled.button(
  {
    padding: '10px 15px',
    border: 0,
    lineHeight: 1,
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariants[variant],
);

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  margin: '20vh auto',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  [mq.small]: {
    width: '95%',
    margin: '10vh auto',
  },
});

const CircleButton = styled.button({
  background: colors.base,
  color: colors.text,
  width: '40px',
  height: '40px',
  borderRadius: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
  lineHeight: '1',
  padding: '0',
});

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input({
  border: 0,
  backgroundColor: colors.gray10,
  padding: '7px',
  borderRadius: '4px',
});

const Label = styled.label({
  color: colors.gray80,
  fontSize: '0.9rem',
});

function ErrorMessage({error = '', ...props}) {
  return (
    <div
      role="alert"
      css={css`
        color: ${colors.danger};
      `}
      {...props}
    >
      <span>There was an error: </span>
      <pre
        css={css`
          white-space: break-spaces;
        `}
      >
        {error}
      </pre>
    </div>
  );
}

const spin = keyframes({
  '0% ': {
    transform: 'rotate(0deg)',
  },

  '100%': {
    transform: 'rotate(360deg)',
  },
});

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
});

function FullPageSpinner() {
  return (
    <div
      css={{
        fontSize: '4em',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  );
}

export {
  Button,
  Dialog,
  CircleButton,
  FormGroup,
  Input,
  Label,
  Spinner,
  FullPageSpinner,
  ErrorMessage,
};

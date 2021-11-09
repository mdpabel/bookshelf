/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import '@reach/dialog/styles.css';
import React from 'react';

import Logo from '../components/Logo';
import {Button} from '../components/lib';
import {ModalOpenButton, Modal, ModelContent} from '../components/modal';
import Form from '../components/Form';

const LoginRegister = ({register, login}) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        height: 100vh;
        width: 100%;
        align-items: center;
        flex-direction: column;
      `}
    >
      <Logo width="100" height="100" />
      <h1
        css={css`
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
        `}
      >
        Bookshelf
      </h1>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-gap: 0.8rem;
        `}
      >
        <Modal>
          <ModalOpenButton>
            <Button>Login</Button>
          </ModalOpenButton>
          <ModelContent aria-label="Login form" title="Login">
            <Form onSubmit={login} buttonText="Login" />
          </ModelContent>
        </Modal>

        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModelContent aria-label="Registration form" title="Registration">
            <Form
              onSubmit={register}
              buttonText="Register"
              variant="secondary"
            />
          </ModelContent>
        </Modal>
      </div>
    </div>
  );
};

export default LoginRegister;

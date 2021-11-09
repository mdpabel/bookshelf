/**@jsxImportSource @emotion/react */
import {css} from '@emotion/react';

import {CircleButton, Dialog} from './lib';
import React, {createContext, useContext, useState} from 'react';

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn && fn(...args));

const ModalContext = createContext();

function Modal({children}) {
  const [openModal, setOpenModal] = useState(false);

  const value = {openModal, setOpenModal};

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(`useModal should used within <Modal />`);
  }
  return context;
}

function ModalOpenButton({children}) {
  const {setOpenModal} = useModal();
  return React.cloneElement(children, {
    onClick: callAll(() => setOpenModal(true)),
  });
}

function ModalCloseButton({children}) {
  const {setOpenModal} = useModal();
  return React.cloneElement(children, {
    onClick: callAll(() => setOpenModal(false)),
  });
}

function ModalContentBase(props) {
  const {openModal, setOpenModal} = useModal();
  return (
    <Dialog
      isOpen={openModal}
      onDismiss={() => setOpenModal(false)}
      {...props}
    />
  );
}

function ModelContent({children, title, ...props}) {
  return (
    <ModalContentBase
      css={css`
        padding: 4em;
      `}
      {...props}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <ModalCloseButton>
          <CircleButton>X</CircleButton>
        </ModalCloseButton>
      </div>
      <h3
        css={css`
          text-align: center;
        `}
      >
        {title}
      </h3>
      {children}
    </ModalContentBase>
  );
}

export {ModalOpenButton, Modal, ModelContent};

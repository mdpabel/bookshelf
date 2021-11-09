/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {useAsync} from '../hooks/useAsync';

import {Button, ErrorMessage, FormGroup, Input, Label, Spinner} from './lib';

function Form({onSubmit, buttonText, variant = 'primary'}) {
  const {run, isLoading, isError, error} = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const {username, password} = event.target.elements;

    run(onSubmit(username.value, password.value));
  }

  return (
    <form
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      `}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input required type="text" id="username" />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input required type="password" id="password" />
      </FormGroup>
      <div>
        <Button type="submit" variant={variant}>
          {buttonText}
          {isLoading ? <Spinner /> : null}
        </Button>
      </div>
      {isError ? <ErrorMessage error={error?.data} /> : null}
    </form>
  );
}

export default Form;

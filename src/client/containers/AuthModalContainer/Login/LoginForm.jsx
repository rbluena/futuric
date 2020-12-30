import React from 'react';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';
import {
  ControlWrapper,
  EmailInput,
  PasswordInput,
  Submit,
} from '@app/components/Form';

const LoginForm = () => {
  const { register, errors: inputErrors, handleSubmit } = useForm({});

  function onSubmit(userData) {}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
      <ControlWrapper>
        <EmailInput
          name="email"
          label="Email"
          placeholder="Email"
          register={register({
            minLength: {
              value: 4,
              message: 'Email should not be less than 4 characters.',
            },
          })}
          error={get(inputErrors, 'email.message')}
        />
      </ControlWrapper>
      <ControlWrapper>
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Password"
          register={register({
            minLength: {
              value: 5,
              message: 'Password should not be less than 5 characters.',
            },
          })}
          error={get(inputErrors, 'password.message')}
        />
      </ControlWrapper>

      <ControlWrapper>
        <Submit size="lg" variant="primary">
          Submit
        </Submit>
      </ControlWrapper>
    </form>
  );
};

export default LoginForm;

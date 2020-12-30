import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { get, isObject } from 'lodash';
import { registerUserAction } from '@app/actions';
import {
  ControlWrapper,
  TextInput,
  EmailInput,
  PasswordInput,
  Submit,
} from '@app/components/Form';

const RegisterForm = () => {
  const { register, errors: inputErrors, handleSubmit } = useForm({});
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null);

  async function onSubmit(userData) {
    try {
      setApiError(null);
      await dispatch(registerUserAction(userData));
    } catch (error) {
      const { message } = error;

      if (isObject(message)) {
        const keys = Object.keys(message);
        const err = message[keys[0]];
        setApiError(err);
      } else {
        setApiError(message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {apiError && (
        <p className="text-sm text-center text-danger-500 mt-4">{apiError}</p>
      )}
      <ControlWrapper>
        <TextInput
          name="username"
          label="Username"
          placeholder="Username"
          register={register({
            required: 'This field is required.',
            minLength: {
              value: 4,
              message: 'Email should not be less than 4 characters.',
            },
          })}
          error={get(inputErrors, 'username.message')}
        />
      </ControlWrapper>

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

export default RegisterForm;

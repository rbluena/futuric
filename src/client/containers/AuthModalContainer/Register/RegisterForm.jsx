import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
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

const RegisterForm = ({ setApiError }) => {
  const { register, errors: inputErrors, handleSubmit } = useForm({});
  const dispatch = useDispatch();

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
      <ControlWrapper>
        <TextInput
          name="username"
          label="Username"
          placeholder="Username"
          register={register({
            required: 'This field is required.',
            minLength: {
              value: 4,
              message: 'Username should not be less than 4 characters.',
            },
          })}
          // eslint-disable-next-line no-return-assign
          onChange={(e) => (e.target.value = e.target.value.trim())}
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

RegisterForm.propTypes = {
  setApiError: PropTypes.func.isRequired,
};

export default RegisterForm;

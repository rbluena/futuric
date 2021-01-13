import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { get } from 'lodash';
import { EmailInput, Submit, ControlWrapper } from '@app/components/Form';
import { requestVerificationTokenAction } from '@app/actions';

const VerificationPage = () => {
  const dispatch = useDispatch();
  const { register, errors: inputErrors, handleSubmit } = useForm({});

  /**
   * Sumitting data
   * @param {Object} data
   */
  function onSubmit(data) {
    dispatch(requestVerificationTokenAction(data));
  }

  return (
    <div className="" style={{ minHeight: '250px' }}>
      <div className="max-w-sm pt-10 mx-auto">
        <p className="text-xl text-center text-neutral-500 pb-6">
          If verification failed, you can request new token.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ControlWrapper>
            <EmailInput
              name="email"
              placeholder="Enter email address"
              register={register({
                required: 'This field is required.',
                minLength: {
                  value: 4,
                  message: 'Email should not be less than 4 characters.',
                },
              })}
              error={get(inputErrors, 'email.message')}
            />
          </ControlWrapper>
          <ControlWrapper>
            <Submit size="lg" variant="primary" outline>
              Request a token
            </Submit>
          </ControlWrapper>
        </form>
      </div>
    </div>
  );
};

export default VerificationPage;

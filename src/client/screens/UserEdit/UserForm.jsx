import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isURL } from 'validator';
import { get } from 'lodash';
import { useForm } from 'react-hook-form';
import { getUserSelector } from '@app/selectors';
import { updateUserAction } from '@app/actions';

import {
  ControlWrapper,
  TextInput,
  EmailInput,
  PasswordInput,
  Select,
  Textarea,
  Submit,
} from '@app/components/Form';
import { Section } from '@app/components';

import countries from './countries.json';

const UserForm = () => {
  const [characters, setCharacters] = useState('');
  const user = useSelector(getUserSelector);
  const dispatch = useDispatch();
  const { handleSubmit, register, errors: inputErrors } = useForm({
    mode: 'onBlur',
    defaultValues: user,
  });

  function onDescriptionChange(value) {
    setCharacters(value);
  }

  function onSubmit(userData) {
    dispatch(updateUserAction({ ...userData, _id: user._id }));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
      <Section heading="Profile Information">
        <ControlWrapper>
          <TextInput
            name="firstname"
            label="First Name: *"
            placeholder="First Name"
            register={register({
              required: 'This field is required. ',
            })}
            error={get(inputErrors, 'firstname.message')}
          />
        </ControlWrapper>
        <ControlWrapper>
          <TextInput
            name="lastname"
            label="Last Name: *"
            placeholder="Last Name"
            register={register({
              required: 'This field is required.',
            })}
            error={get(inputErrors, 'lastname.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <TextInput
            name="username"
            label="Username: *"
            placeholder="Username"
            register={register({
              required: 'This field is required.',
            })}
            error={get(inputErrors, 'username.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <TextInput
            name="brandname"
            label="Brand Name: *"
            placeholder="Brand Name"
            register={register({
              required: 'This field is required.',
            })}
            error={get(inputErrors, 'brandname.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <TextInput
            name="website"
            label="Website:"
            placeholder="Website"
            register={register({
              validate: (value) => {
                if (value.length && !isURL(value))
                  return 'This is not valid website URL.';

                return true;
              },
            })}
            error={get(inputErrors, 'website.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <EmailInput
            name="email"
            label="Email: *"
            placeholder="Email"
            register={register({
              minLength: {
                value: 4,
                message: 'Email should not be less than 4 characters.',
              },
            })}
            disabled
            error={get(inputErrors, 'email.message')}
          />
        </ControlWrapper>
        <ControlWrapper>
          <Textarea
            name="description"
            label="Description:"
            placeholder="Use few words to describe yourself or the brand behind profile."
            register={register({
              maxLength: {
                value: 100,
                message: 'Characters exceeds max number.',
              },
            })}
            error={get(inputErrors, 'description.message')}
            onChange={(evt) => onDescriptionChange(evt.target.value)}
          />
          <span className="text-xs">
            {100 - characters.length} characters left.
          </span>
        </ControlWrapper>
      </Section>

      <Section heading="Address">
        <ControlWrapper>
          <TextInput
            name="address.address"
            label="Address:"
            placeholder="Address"
            register={register}
            error={get(inputErrors, 'address.address.message')}
          />
        </ControlWrapper>
        <ControlWrapper>
          <TextInput
            name="address.city"
            label="City:"
            placeholder="City"
            register={register}
            error={get(inputErrors, 'address.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <Select
            label="Country:"
            name="address.country"
            options={[{ label: 'Select country', value: '' }, ...countries]}
            register={register({
              minLength: {
                value: 2,
                message: 'This value is required.',
              },
            })}
            error={get(inputErrors, 'address.country.message')}
          >
            <option value="">Select country</option>
            {countries.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </Select>
        </ControlWrapper>
      </Section>

      <Section heading="Change Password (Optional):">
        <ControlWrapper>
          <PasswordInput
            name="oldPassword"
            label="Old Password:"
            placeholder="Old Password"
            register={register({
              minLength: {
                value: 5,
                message: 'Password should not be less than 5 characters.',
              },
            })}
            error={get(inputErrors, 'oldPassword.message')}
          />
        </ControlWrapper>

        <ControlWrapper>
          <PasswordInput
            name="password"
            label="New Password:"
            placeholder="New Password"
            register={register({
              minLength: {
                value: 5,
                message: 'Password should not be less than 5 characters.',
              },
            })}
            error={get(inputErrors, 'password.message')}
          />
        </ControlWrapper>
      </Section>

      <ControlWrapper>
        <Submit>Submit</Submit>
      </ControlWrapper>
    </form>
  );
};

export default UserForm;

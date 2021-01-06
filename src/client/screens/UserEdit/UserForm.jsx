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
import { PencilIcon } from '@app/components/Icons';
import { Section, Button } from '@app/components';

import countries from './countries.json';

const UserForm = () => {
  const [showOnlinePrecense, setShowOnlinePrecense] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
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
            // eslint-disable-next-line no-return-assign
            onChange={(e) => (e.target.value = e.target.value.trim())}
          />
        </ControlWrapper>

        <ControlWrapper>
          <TextInput
            name="brandname"
            label="Brand Name: *"
            placeholder="Use your brand name or full name."
            register={register({
              required: 'This field is required.',
            })}
            error={get(inputErrors, 'brandname.message')}
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

      {/* start: website and social media */}
      {!showOnlinePrecense ? (
        <Button
          variant="text-button"
          className="text-primary-700 hover:text-primary-900 text-sm font-light flex items-center"
          onClick={() => setShowOnlinePrecense(true)}
        >
          <span>Online presence</span>&nbsp;
          <PencilIcon size="xs" />
        </Button>
      ) : (
        <Section heading="Online Presence">
          <ControlWrapper>
            <TextInput
              name="website"
              label="Website:"
              placeholder="Website"
              register={register({
                validate: (value) => {
                  if (value.length && !isURL(value))
                    return 'This is not valid URL.';

                  return true;
                },
              })}
              error={get(inputErrors, 'website.message')}
            />
          </ControlWrapper>

          <ControlWrapper>
            <TextInput
              name="social.twitter"
              label="Twitter:"
              placeholder="Twitter profile"
              register={register({
                validate: (value) => {
                  if (value.length && !isURL(value))
                    return 'This is not valid URL.';

                  return true;
                },
              })}
              error={get(inputErrors, 'social.twitter.message')}
            />
          </ControlWrapper>

          <ControlWrapper>
            <TextInput
              name="social.instagram"
              label="Instagram:"
              placeholder="Instagram profile"
              register={register({
                validate: (value) => {
                  if (value.length && !isURL(value))
                    return 'This is not valid URL.';

                  return true;
                },
              })}
              error={get(inputErrors, 'social.instagram.message')}
            />
          </ControlWrapper>

          <ControlWrapper>
            <TextInput
              name="social.youtube"
              label="YouTube:"
              placeholder="Youtube profile"
              register={register({
                validate: (value) => {
                  if (value.length && !isURL(value))
                    return 'This is not valid URL.';

                  return true;
                },
              })}
              error={get(inputErrors, 'social.youtube.message')}
            />
          </ControlWrapper>

          <ControlWrapper>
            <TextInput
              name="social.facebook"
              label="Facebook:"
              placeholder="Facebook profile or page"
              register={register({
                validate: (value) => {
                  if (value.length && !isURL(value))
                    return 'This is not valid  URL.';

                  return true;
                },
              })}
              error={get(inputErrors, 'social.facebook.message')}
            />
          </ControlWrapper>
        </Section>
      )}
      {/* end: website and social media */}

      {/* start: profile's address */}
      {!showAddress ? (
        <Button
          variant="text-button"
          className="text-primary-700 hover:text-primary-900 text-sm font-light flex items-center"
          onClick={() => setShowAddress(true)}
        >
          <span>Profile address</span>&nbsp;
          <PencilIcon size="xs" />
        </Button>
      ) : (
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
      )}
      {/* end: profile's address */}

      {!showChangePassword ? (
        <Button
          variant="text-button"
          className="text-primary-700 hover:text-primary-900 text-sm font-light flex items-center"
          onClick={() => setShowChangePassword(true)}
        >
          <span>Change password</span>&nbsp;
          <PencilIcon size="xs" />
        </Button>
      ) : (
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
      )}

      <ControlWrapper>
        <Submit>Submit</Submit>
      </ControlWrapper>
    </form>
  );
};

export default UserForm;

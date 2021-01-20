import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateLinkAction } from '@app/actions';
import { useForm } from 'react-hook-form';
import { isURL } from 'validator';
import { get } from 'lodash';
import { closeModal } from '@app/slices/globalSlice';
import { InfoIcon } from '@app/components/Icons';
import { ControlWrapper, TextInput, Submit } from '@app/components/Form';

const ActivateLink = ({ activeLink }) => {
  const dispatch = useDispatch();
  const { handleSubmit, register, errors: inputErrors } = useForm({
    mode: 'onBlur',
    defaultValues: {
      longUrl: activeLink.longUrl,
    },
  });

  function onSubmit(data) {
    dispatch(updateLinkAction(activeLink._id, { ...data, isActive: true }));
    dispatch(closeModal());
  }

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <span className="flex items-center text-sm font-light text-neutral-600">
          <InfoIcon size="xs" /> &nbsp; Update the URL to point to your content.
        </span>
        <ControlWrapper>
          <TextInput
            name="longUrl"
            label="URL:"
            placeholder="Enter your URL."
            register={register({
              validate: (value) => {
                if (value.length && !isURL(value))
                  return 'This is not valid URL.';

                return true;
              },
            })}
            error={get(inputErrors, 'longUrl.message')}
          />
        </ControlWrapper>
        <ControlWrapper>
          <div className="h-5">
            <Submit>Activate</Submit>
          </div>
        </ControlWrapper>
      </form>
    </div>
  );
};

ActivateLink.propTypes = {
  activeLink: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default ActivateLink;

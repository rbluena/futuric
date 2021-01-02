/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ContentEditable from 'react-sane-contenteditable';
import DatePicker from 'react-datepicker';
import { updateLinkAction } from '@app/actions';
import { Select, Submit, ControlWrapper } from '@app/components/Form';
import categOptions from '@app/utils/categories.json';
import topicOptions from '@app/utils/topics.json';

import 'react-datepicker/dist/react-datepicker.css';

const Editor = ({ link }) => {
  const [title, setTitle] = useState(link.title);
  const [description, setDescription] = useState(link.description);
  const [date, setDate] = useState(link.availableAt);
  const [category, setCategory] = useState(link.category);
  const [topic, setTopic] = useState(link.topic);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setDescription(link.description);
      if (link.availableAt) {
        setDate(new Date(link.availableAt));
      }
      setCategory(link.category || '');
      setTopic(link.topic || '');
    }
  }, [link]);

  const dispatch = useDispatch();

  function submitData(evt) {
    evt.preventDefault();
    if (title.length === 0) {
      setError({ type: 'title', message: "This field can't be empty." });
      return;
    }

    dispatch(
      updateLinkAction({
        title,
        description,
        availableDate: date,
        category,
        topic,
      })
    );
  }

  return (
    <div className="py-10">
      <form className="max-w-5xl mx-auto" onSubmit={submitData}>
        <ControlWrapper>
          <label htmlFor="title" className="text-neutral-600 mb-1 block">
            Title: *
          </label>
          <ContentEditable
            id="title"
            content={title}
            autoComplete="off"
            onChange={(evt, value) => setTitle(value)}
            className="border-b bg-neutral-100 border-primary-400 focus:outline-none focus:border-primary-700 text-3xl font-light font-serif p-1"
          />
          <span className="text-xs text-danger-500">
            {error && error.type === 'title' && error.message}
          </span>
        </ControlWrapper>
        <ControlWrapper>
          <label htmlFor="date-picker" className="text-neutral-600 block">
            Description:
          </label>
          <ContentEditable
            content={description}
            onChange={(evt, value) => setDescription(value)}
            className="border-b bg-neutral-100 border-primary-400 focus:outline-none focus:border-primary-700 text-xl font-serif p-1"
            autoComplete="off"
            style={{ minHeight: '200px' }}
          />
        </ControlWrapper>
        <ControlWrapper>
          <span className="text-neutral-600 mb-1 block">
            Select where it fits most: *
          </span>
          <div className="flex flex-wrap">
            <Select
              name="category"
              onChange={(evt) => setCategory(evt.target.value)}
              value={category}
              required
            >
              <option value="">Select category</option>
              {categOptions.map((item) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </Select>
            &nbsp; &nbsp;
            <Select
              name="topic"
              onChange={(evt) => setTopic(evt.target.value)}
              value={topic}
              required
            >
              <option value="">Select topic</option>
              {topicOptions.map((item) => (
                <option value={item.code}>{item.name}</option>
              ))}
            </Select>
          </div>
        </ControlWrapper>

        <div>
          <ControlWrapper>
            <label
              htmlFor="date-picker"
              className="text-neutral-600 mb-1 block"
            >
              When do you expect your content to be available online?
            </label>
            <DatePicker
              id="date-picker"
              selected={date}
              showTimeSelect
              onChange={(pickedDate) => {
                setDate(pickedDate);
              }}
              autoComplete="off"
              dateFormat="MMM dd, yyyy - p"
              className="outline-none py-2 px-1 focus:outline-none border-b border-primary-400 focus:border-primary-600"
            />
          </ControlWrapper>
        </div>

        <footer className="py-4">
          <Submit>Create Link</Submit>
        </footer>
      </form>
    </div>
  );
};

Editor.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Editor;

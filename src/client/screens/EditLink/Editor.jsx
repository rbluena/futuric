/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { encode, decode } from 'html-entities';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-datepicker';
import sanitizeHtml from 'sanitize-html';
import { updateLinkAction } from '@app/actions';
import { Select, Submit, ControlWrapper } from '@app/components/Form';
import categOptions from '@app/utils/categories.json';
import topicOptions from '@app/utils/topics.json';

import 'react-datepicker/dist/react-datepicker.css';

const sanitizeConf = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'p', 'div', 'br'],
  allowedAttributes: { a: ['href'] },
};

const Editor = ({ link }) => {
  const title = useRef(decode(link.title));
  const description = useRef(decode(link.description));
  const [date, setDate] = useState(link.availableAt);
  const [category, setCategory] = useState(link.category);
  const [topic, setTopic] = useState(link.topic);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (link) {
      title.current = link.title;
      description.current = decode(link.description);

      if (link.availableDate) {
        setDate(new Date(link.availableDate));
      }

      setCategory(link.category || '');
      setTopic(link.topic || '');
    }
  }, [link]);

  const dispatch = useDispatch();

  /**
   *
   */
  function submitData(evt) {
    evt.preventDefault();
    if (title.length === 0) {
      setError({ type: 'title', message: "This field can't be empty." });
      return;
    }

    dispatch(
      updateLinkAction(link._id, {
        title: encode(sanitizeHtml(title.current, sanitizeConf)),
        description: encode(sanitizeHtml(description.current, sanitizeConf)),
        availableDate: new Date(date),
        category,
        topic,
      })
    );
  }

  /**
   *
   */
  function titleHandler(evt) {
    title.current = evt.target.value;
  }

  /**
   *
   */
  function descriptionHandler(evt) {
    description.current = evt.target.value;
  }

  return (
    <div className="py-10">
      <form className="max-w-5xl mx-auto" onSubmit={submitData}>
        <ControlWrapper>
          <label
            htmlFor="title"
            className="text-neutral-600 block font-bold mt-6 mb-2"
          >
            Title: *
          </label>
          <ContentEditable
            id="title"
            html={title.current}
            autoComplete="off"
            onChange={titleHandler}
            className="border-b bg-neutral-100 border-primary-400 focus:outline-none focus:border-primary-700 text-4xl font-bold p-2"
          />
          <span className="text-xs text-danger-500">
            {error && error.type === 'title' && error.message}
          </span>
        </ControlWrapper>
        <ControlWrapper>
          <label
            htmlFor="date-picker"
            className="text-neutral-600 block font-bold mt-6 mb-2"
          >
            Description:
          </label>
          <ContentEditable
            html={description.current}
            onChange={descriptionHandler}
            className="border-b bg-neutral-100 border-primary-400 focus:outline-none focus:border-primary-700 text-xl p-2 font-light leading-7"
            autoComplete="off"
            style={{ minHeight: '200px' }}
          />
        </ControlWrapper>
        <ControlWrapper>
          <label
            htmlFor="category"
            className="text-neutral-600 block font-bold mt-6 mb-2"
          >
            Select where it fits most: *
          </label>
          <div className="flex flex-wrap">
            <Select
              name="category"
              onChange={(evt) => setCategory(evt.target.value)}
              value={category}
              required
            >
              <option value="">Select category</option>
              {categOptions.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
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
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </Select>
          </div>
        </ControlWrapper>

        <ControlWrapper>
          <label
            htmlFor="date-picker"
            className="text-neutral-600 block font-bold mt-6 mb-2"
          >
            When do you expect your content to be available online?
          </label>
          <DatePicker
            id="date-picker"
            minDate={new Date()}
            showDisabledMonthNavigation
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

        <footer className="py-4">
          <Submit>Submit</Submit>
        </footer>
      </form>
    </div>
  );
};

Editor.propTypes = {
  link: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Editor;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContentEditable from 'react-sane-contenteditable';
import DatePicker from 'react-datepicker';
import { Select, ControlWrapper, Submit } from '@app/components/Form';
import { getLinksStateSelector } from '@app/selectors';
import { Link, Button } from '@app/components';
import { createLinkAction } from '@app/actions';
import { removeCreatedLink } from '@app/slices/linksSlice';
import { clearNotification } from '@app/slices/globalSlice';
import categOptions from '@app/utils/categories.json';
import topicOptions from '@app/utils/topics.json';

import 'react-datepicker/dist/react-datepicker.css';

const CreateLink = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { createdLink } = useSelector(getLinksStateSelector);

  function submitData(evt) {
    evt.preventDefault();

    if (title.length === 0) {
      setError({ type: 'title', message: "This field can't be empty." });
      return;
    }

    dispatch(
      createLinkAction({
        title,
        description,
        availableDate: date,
        category,
        topic,
      })
    );
  }

  /**
   * Clearing all from data
   */
  function createNew() {
    dispatch(clearNotification());
    dispatch(removeCreatedLink());
    setDate(null);
    setDescription('');
    setTitle('');
    setCategory('');
    setTopic('');
    setError(null);
  }

  if (createdLink) {
    return (
      <div className="text-center flex flex-col items-center pt-4">
        <Link href={createdLink.longUrl} size="lg" className="mb-8">
          View created link
        </Link>
        <Button variant="primary" outline onClick={createNew}>
          Create New
        </Button>
      </div>
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

        <div>
          {/* <div className="p-3">
            <label htmlFor="comments">
              <input id="comments" type="checkbox" required /> &nbsp; Allow
              comments on the page.
            </label>
          </div> */}
          <ControlWrapper>
            <label
              htmlFor="date-picker"
              className="text-neutral-600 mb-1 block"
            >
              When do you expect your content to be available online?
              (Optional):
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
        </div>

        <footer className="py-4">
          <Submit>Create</Submit>
        </footer>
      </form>
    </div>
  );
};

export default CreateLink;

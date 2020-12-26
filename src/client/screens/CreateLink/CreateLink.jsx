/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ContentEditable from 'react-sane-contenteditable';
import DatePicker from 'react-datepicker';
import { Button } from '@app/components';
import { Select } from '@app/components/Form';

import 'react-datepicker/dist/react-datepicker.css';

const CreateLink = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [topics, setTopics] = useState('');

  return (
    <div className="py-10">
      <div className=" max-w-5xl mx-auto">
        <ContentEditable
          content={title}
          onChange={(evt, value) => setTitle(value)}
          className="border-b border-primary-400 focus:outline-none focus:border-primary-700 text-4xl font-serif py-1"
          placeholder="Title"
        />
        <ContentEditable
          content={description}
          onChange={(evt, value) => setDescription(value)}
          className="bg-neutral-100 focus:outline-none text-lg font-serif py-1 mt-8"
          placeholder="Title"
          style={{ minHeight: '200px' }}
        />

        <div>
          {/* <div className="p-3">
            <label htmlFor="comments">
              <input id="comments" type="checkbox" required /> &nbsp; Allow
              comments on the page.
            </label>
          </div> */}
          <div className="py-3">
            <label
              htmlFor="date-picker"
              className="text-neutral-600 mb-1 block"
            >
              When do you expect your content to be available? (Optional):
            </label>
            <DatePicker
              id="date-picker"
              selected={startDate}
              showTimeSelect
              onChange={(date) => {
                setStartDate(date);
              }}
              dateFormat="MMM dd, yyyy - p"
              className="outline-none py-2 px-1 focus:outline-none border-b border-primary-400 focus:border-primary-600"
            />
          </div>
        </div>

        <div>
          <span className="text-neutral-600 mb-1 block">
            Select where it fits most.
          </span>
          <div className="flex flex-wrap">
            <Select
              options={[
                { label: 'Select Category', value: '' },
                { label: 'Article', value: 'actions' },
                { label: 'App Or Website', value: 'movies' },
                { label: 'Art', value: 'pranks' },
                { label: 'Book', value: 'pranks' },
                { label: 'Documentary', value: 'documentaries' },
                { label: 'Film', value: 'pranks' },
                { label: 'Livestream', value: 'pranks' },
                { label: 'Podcast', value: 'pranks' },
                { label: 'Video', value: 'pranks' },
              ]}
              onChange={(evt) => setCategory(evt.target.value)}
              value={category}
              required
            />
            &nbsp; &nbsp;
            <Select
              options={[
                { label: 'Select topic', value: '' },
                { label: 'Movies', value: 'movies' },
                { label: 'Pranks', value: 'pranks' },
                { label: 'Business', value: 'pranks' },
                { label: 'Politics', value: 'pranks' },
                { label: 'Literature', value: 'pranks' },
                { label: 'Startup', value: 'pranks' },
                { label: 'Comedy', value: 'pranks' },
                { label: 'Science & Tech', value: 'pranks' },
                { label: 'Health', value: 'pranks' },
                { label: 'Language', value: 'pranks' },
                { label: 'Sports', value: 'pranks' },
                { label: 'Personal Development', value: 'pranks' },
                { label: 'Programming', value: 'pranks' },
                { label: 'Relationships', value: 'pranks' },
                { label: 'Pranks', value: 'pranks' },
              ]}
              onChange={(evt) => setTopics(evt.target.value)}
              value={topics}
              required
            />
          </div>
        </div>

        <footer className="py-4">
          <Button>Create Link</Button>
        </footer>
      </div>
    </div>
  );
};

export default CreateLink;

/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ContentEditable from 'react-sane-contenteditable';
import DatePicker from 'react-datepicker';
import { Button } from '@app/components';
import { Select } from '@app/components/Form';
import 'react-datepicker/dist/react-datepicker.css';

const Editor = () => {
  const [title, setTitle] = useState('Some text for the title.');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [category, setCategory] = useState('');
  const [topics, setTopics] = useState('');

  return (
    <div className="mx-auto pt-10">
      <ContentEditable
        content={title}
        onChange={(evt, value) => setTitle(value)}
        className="border-b border-primary-400 focus:outline-none focus:border-primary-700 text-4xl font-serif font-light py-1"
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
            className="text-neutral-600 mb-1 block text-sm"
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

      {/* start: selecting options */}
      <div>
        <span className="text-neutral-600 mb-1 block text-sm">
          Select category and topic for your content.
        </span>
        <div className="flex flex-wrap">
          <Select
            options={[
              { label: 'Select Category', value: '' },
              { label: 'Article', value: 'actions' },
              { label: 'App Or Website', value: 'movies' },
              { label: 'Art', value: 'art' },
              { label: 'Book', value: 'book' },
              { label: 'Documentary', value: 'documentary' },
              { label: 'Film', value: 'film' },
              { label: 'Livestream', value: 'livestream' },
              { label: 'Podcast', value: 'podcast' },
              { label: 'Video', value: 'video' },
              { label: 'Vlog', value: 'vlog' },
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
              { label: 'Business', value: 'business' },
              { label: 'Politics', value: 'politics' },
              { label: 'Literature', value: 'literature' },
              { label: 'Startup', value: 'startup' },
              { label: 'Comedy', value: 'comedy' },
              { label: 'Science & Tech', value: 'sci-tech' },
              { label: 'Health', value: 'health' },
              { label: 'Language', value: 'language' },
              { label: 'Sports', value: 'sports' },
              { label: 'Personal Development', value: 'personal-development' },
              { label: 'Programming', value: 'programming' },
              { label: 'Relationships', value: 'relationships' },
            ]}
            onChange={(evt) => setTopics(evt.target.value)}
            value={topics}
            required
          />
        </div>
      </div>
      {/* end: selecting options */}

      <footer className="py-4">
        <Button>Create Link</Button>
      </footer>
    </div>
  );
};

export default Editor;

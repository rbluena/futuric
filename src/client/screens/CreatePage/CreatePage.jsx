import React, { useState } from 'react';
import ContentEditable from 'react-sane-contenteditable';
import DatePicker from 'react-datepicker';
import { Button } from '@app/components';

import 'react-datepicker/dist/react-datepicker.css';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());

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
          className=" bg-neutral-100 focus:outline-none text-lg font-serif py-1 mt-8"
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
              When do you expect the content to be available? (Option):
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

        <footer className="py-2">
          <Button>Create Link</Button>
        </footer>
      </div>
    </div>
  );
};

export default CreatePage;

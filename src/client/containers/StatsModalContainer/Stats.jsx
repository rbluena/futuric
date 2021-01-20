import React from 'react';
import PropTypes from 'prop-types';
import millify from 'millify';

const Stats = ({ comments, views, waitlist }) => (
  <div className="p-5">
    <h2 className="text-5xl border-b border-neutral-200 pb-2 font-light">
      Stats
    </h2>
    <div className="flex flex-wrap py-8 justify-start items-start">
      <div className="">
        <div className="flex flex-wrap p-6">
          <p className="text-5xl text-neutral-600 font-light italic">
            {millify(views)}
          </p>
          &nbsp;
          <span className="font-bold pl-1">Views</span>
        </div>
        <div className="flex p-6">
          <p className="text-5xl text-neutral-600 font-light italic">
            {millify(waitlist)}
          </p>
          &nbsp;
          <span className="font-bold pl-1">Waitlisted</span>
        </div>
      </div>
      <div className="">
        <div className="flex p-6">
          <p className="text-5xl text-neutral-600 font-light italic">
            {millify(comments)}
          </p>
          &nbsp;
          <span className="font-bold pl-1">Comments</span>
        </div>
        {/* <div className="flex p-6">
          <p className="text-5xl text-neutral-600 font-light italic">230</p>
          &nbsp;
          <span className="font-bold">Comments</span>
        </div> */}
      </div>
    </div>
  </div>
);

Stats.propTypes = {
  comments: PropTypes.number.isRequired,
  waitlist: PropTypes.number.isRequired,
  views: PropTypes.number.isRequired,
};

export default Stats;

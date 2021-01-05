import React from 'react';
import { useRouter } from 'next/router';
import topics from '@app/utils/topics';
import TogglePill from './TogglePill';

const FilterContainer = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { topic } = query;

  /**
   * Adding or removing topics
   * @param {Object} evt
   */
  function onChange(evt) {
    const { value } = evt.target;
    const newQuery = { ...query, topic: value };

    // if (topic) {
    //   if (typeof topic === 'string') {
    //     if (topic === value) {
    //       // Delete topics completely
    //       delete query.topic;
    //     } else {
    //       // Add new topic with previous one
    //       newQuery = { ...query, topic: [topic, value] };
    //     }
    //   } else if (topic.includes(value)) {
    //     newQuery = { ...query, topic: topic.filter((item) => item !== value) };
    //   } else {
    //     newQuery = { ...query, topic: [...topic, value] };
    //   }
    // } else {
    //   newQuery = { ...query, topic: value };
    // }

    router.push({
      pathname,
      query: newQuery,
    });
  }

  return (
    <div className="border-b border-t border-neutral-200 p-1 mb-4">
      <div className="flex justify-between px-2 overflow-x-auto overflow-y-hidden ml-auto">
        {topics.map((item) => {
          let checked = false;

          if (topic && (topic === item.code || topic.includes(item.code))) {
            checked = true;
          }

          return (
            <TogglePill
              key={item.code}
              label={item.name}
              checked={checked}
              value={item.code}
              onChange={onChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterContainer;

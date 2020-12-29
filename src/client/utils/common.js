import Router from 'next/router';
// eslint-disable-next-line import/prefer-default-export
export const redirectTo = (location, res) => {
  if (process.browser) {
    if (location.match(/^(http|https):\/\//)) {
      window.location.href = location;
    } else {
      Router.push(location);
    }
  } else {
    res.writeHead(303, { Location: location });
    res.end();
  }
};

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getLinksService } from '@app/services';
import { getLinksSuccess } from '@app/slices/linksSlice';
import { LayoutManager, Head, Header, Footer } from '@app/components';
import LinksPage from '@app/screens/AllLinks';
import categories from '@app/utils/categories';

export async function getServerSideProps({ query, params }) {
  let data = {};
  const { code } = params;

  try {
    ({ data } = await getLinksService({ ...query, limit: 15, category: code }));
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code,
      links: {
        data: data.data || {},
        meta: data.meta || {},
      },
    },
  };
}

const Category = ({ links, code }) => {
  const dispatch = useDispatch();
  const category = categories.find((item) => item.code === code);

  useEffect(() => {
    dispatch(getLinksSuccess(links));
  }, [dispatch, links]);

  return (
    <LayoutManager>
      <Head title={category.name} />
      <Header showTopics />
      <LinksPage />
      <Footer />
    </LayoutManager>
  );
};

Category.defaultProps = {
  links: {},
  code: '',
};

Category.propTypes = {
  links: PropTypes.objectOf(PropTypes.shape),
  code: PropTypes.string,
};

export default Category;

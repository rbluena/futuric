import { isEmpty } from 'lodash';
import { getLinkService } from '@app/services';

export async function getServerSideProps({ query }) {
  try {
    const { to } = query;

    if (!to) {
      return {
        notFound: true,
      };
    }

    const { data: link } = await getLinkService(to);

    if (isEmpty(link)) {
      return {
        notFound: true,
      };
    }

    if (link.isActive) {
      return {
        redirect: {
          destination: link.longUrl,
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/links/${link._id}`,
        permanent: false,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const Redirect = () => null;

export default Redirect;

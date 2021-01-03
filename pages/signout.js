import { useDispatch } from 'react-redux';
import { logoutUserAction } from '@app/actions';
import { useEffectOnce } from 'react-use';

const MyLinks = () => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(logoutUserAction());
  });

  return null;
};

export default MyLinks;

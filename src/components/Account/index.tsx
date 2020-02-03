import React, { FC, useContext } from 'react';
import { AuthContext } from 'store/context/auth';
import Profile from 'components/Profile';
import IntroApp from 'components/Auth/IntroApp';
const Account: FC = () => {
  const { state } = useContext(AuthContext);
  const { token } = state;
  return token ? <Profile /> : <IntroApp />;
};
export default Account;

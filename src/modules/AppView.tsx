import React, {FC, useEffect, useState, memo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import IntroApp from 'modules/IntroApp';
import NavigatorView from 'navigation/Navigator';

const AppView: FC = () => {
  const [open, setOpen] = useState(true);

  const onDone = async () => {
    try {
      await AsyncStorage.setItem('firstOpen', 'true');
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const useFirstOpenApp = async () => {
    const data = await AsyncStorage.getItem('firstOpen');

    if (data) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  useEffect(() => {
    useFirstOpenApp();
  }, []);

  return open ? <NavigatorView /> : <IntroApp onDone={onDone} />;
};

export default memo(AppView);

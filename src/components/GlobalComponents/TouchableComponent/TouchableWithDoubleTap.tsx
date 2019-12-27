import React, { FC, ReactChild, useState } from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProperties } from 'react-native';

interface IProps extends TouchableWithoutFeedbackProperties {
  children?: ReactChild
  delay?: number;
  onDoubleTap: (item?: any) => any;
};

const TouchableWithDoubleTap: FC<IProps> = (props) => {
  const { children, delay, onDoubleTap } = props;
  const [lastTap, setLastTab] = useState(0);

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap && (now - lastTap) < (delay || 300)) {
      onDoubleTap();
    } else {
      setLastTab(now);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      {children}
    </TouchableWithoutFeedback>
  );
};

TouchableWithDoubleTap.defaultProps = {
  delay: 300
}
export default TouchableWithDoubleTap;

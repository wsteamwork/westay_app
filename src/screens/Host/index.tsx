import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import KindOfBeds from './Step1/KindOfBeds';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

interface IProps {
  initialProps?: any;
}

const Host: FC<IProps> = (props) => {
  const { t } = useTranslation();
  return <KindOfBeds />;
};

const styles = StyleSheet.create({});
export default Host;

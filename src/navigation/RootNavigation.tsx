import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import ForgotPassword from 'components/Auth/ForgotPassword';
import PrivacyPolicy from 'components/Auth/Rules/PrivacyPolicy';
import TermsAndConditions from 'components/Auth/Rules/TermsAndConditions';

const stackNavigator = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  ForgetPassword: { screen: ForgotPassword },
  TermsAndConditions: { screen: TermsAndConditions },
  PrivacyPolicy: { screen: PrivacyPolicy },
});

export default createAppContainer(stackNavigator);

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import ForgotPassword from 'components/Auth/ForgotPassword';
import PrivacyPolicy from 'components/Auth/Rules/PrivacyPolicy';
import TermsAndConditions from 'components/Auth/Rules/TermsAndConditions';
import IntroApp from 'components/Auth/IntroApp';
import BoxImageLT from 'components/LTRoom/BoxDetailRoom/BoxImageLT';
import BoxDetailRoom from 'components/LTRoom/BoxDetailRoom';

const stackNavigator = createStackNavigator({
  IntroApp: { screen: IntroApp },
  Register: { screen: Register },
  Login: { screen: Login },
  ForgotPassword: { screen: ForgotPassword },
  TermsAndConditions: { screen: TermsAndConditions },
  PrivacyPolicy: { screen: PrivacyPolicy },
  BoxImageLT: { screen: BoxImageLT },
  BoxDetailRoom: { screen: BoxDetailRoom },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    header: () => null,
  }),
});

export default createAppContainer(stackNavigator);

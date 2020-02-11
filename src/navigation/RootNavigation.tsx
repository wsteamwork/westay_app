import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import ForgotPassword from 'components/Auth/ForgotPassword';
import PrivacyPolicy from 'components/Auth/Rules/PrivacyPolicy';
import TermsAndConditions from 'components/Auth/Rules/TermsAndConditions';
import IntroApp from 'components/Auth/IntroApp';
import BoxImageLT from 'components/LTRoom/BoxDetailRoom/BoxImageLT';
import BoxDetailRoom from 'components/LTRoom/BoxDetailRoom';
import Settings from 'components/Settings';
import Filter from 'components/Filter';
import MyMapView from 'modules/MapView';
import BottomNavigation from './BottomNavigation';
import EditProfile from 'components/EditProfile';
import ListRooms from 'components/ListRooms';
import SearchSuggest from 'components/SearchComponent';
import CollectionScreen from 'components/Collections/CollectionScreen';

const stackNavigator = createStackNavigator({
  Main: {
    screen: BottomNavigation,
  },
  IntroApp: { screen: IntroApp },
  Register: { screen: Register },
  Login: { screen: Login },
  Settings: { screen: Settings },
  EditProfile: {screen: EditProfile },
  TermsAndConditions: { screen: TermsAndConditions },
  ForgotPassword: { screen: ForgotPassword },
  PrivacyPolicy: { screen: PrivacyPolicy },
  DetailScreen: { screen: BoxImageLT },
  BoxImageLT: { screen: BoxImageLT },
  BoxDetailRoom: { screen: BoxDetailRoom },
  ListRooms: { screen: ListRooms},
  SearchSuggest: { screen: SearchSuggest },
  Filter: { screen: Filter},
  MapFilter: { screen: MyMapView},
  CollectionScreen: { screen: CollectionScreen},
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    header: () => null,
  }),
});

export default createAppContainer(stackNavigator);

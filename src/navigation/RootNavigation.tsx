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
import ChooseDayBookingLT from 'components/ChooseDayBookingLT';
import BoxCustomerInformation from 'components/BoxCustomerInformation';
import BoxConfirmBooking from 'components/BoxConfirmBooking';
import ShowCheckinCheckout from 'components/BoxConfirmBooking/ShowCheckinCheckout';
import BoxBookingRoom from 'components/LTRoom/BoxDetailRoom/BoxBookingRoom';
import BoxDirectTransfer from 'components/BoxDirectTransfer';
import BoxPaymentBaoKim from 'components/BoxPaymentBaoKim';
import WebViewBaoKim from 'components/BoxPaymentBaoKim/WebViewBaoKim';
import ReNewalBooking from 'components/ReNewalBooking';
import BoxRenewalBooking from 'components/BoxRenewalBooking';
import BoxChooseInspectorType from 'components/BoxChooseInspectorType.tsx';
import InspectorDetail from 'components/BoxChooseInspectorType.tsx/InspectorDetail';
import InspectorItem from 'components/BoxChooseInspectorType.tsx/InspectorItem';

/**
 * @author DucNhatDMJ<phamducnhat1977@gmail.com>
 */

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: BottomNavigation,
    },
    IntroApp: { screen: IntroApp },
    Register: { screen: Register },
    Login: { screen: Login },
    Settings: { screen: Settings },
    EditProfile: { screen: EditProfile },
    TermsAndConditions: { screen: TermsAndConditions },
    ForgotPassword: { screen: ForgotPassword },
    PrivacyPolicy: { screen: PrivacyPolicy },
    DetailScreen: { screen: BoxImageLT },
    BoxDetailRoom: { screen: BoxDetailRoom },
    ListRooms: { screen: ListRooms },
    SearchSuggest: { screen: SearchSuggest },
    Filter: { screen: Filter },
    MapFilter: { screen: MyMapView },
    CollectionScreen: { screen: CollectionScreen },
    ChooseDayBookingLT: { screen: ChooseDayBookingLT },
    BoxBookingRoom: { screen: BoxBookingRoom },
    ShowCheckinCheckout: { screen: ShowCheckinCheckout },
    BoxConfirmBooking: { screen: BoxConfirmBooking },
    BoxCustomerInformation: { screen: BoxCustomerInformation },
    BoxDirectTransfer: { screen: BoxDirectTransfer },
    BoxPaymentBaoKim: { screen: BoxPaymentBaoKim },
    WebViewBaoKim: { screen: WebViewBaoKim },
    ReNewalBooking: { screen: ReNewalBooking },
    BoxRenewalBooking: { screen: BoxRenewalBooking },
    BoxChooseInspectorType: { screen: BoxChooseInspectorType },
    InspectorDetail: { screen: InspectorDetail },
    InspectorItem: { screen: InspectorItem },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: () => null,
    }),
  },
);

export default createAppContainer(stackNavigator);

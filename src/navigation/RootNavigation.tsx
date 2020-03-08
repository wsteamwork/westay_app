import ForgotPassword from 'components/Auth/ForgotPassword';
import IntroApp from 'components/Auth/IntroApp';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import PrivacyPolicy from 'components/Auth/Rules/PrivacyPolicy';
import TermsAndConditions from 'components/Auth/Rules/TermsAndConditions';
import BoxChooseInspectorType from 'components/BoxChooseInspectorType';
import InspectorDetail from 'components/BoxChooseInspectorType/InspectorDetail';
import InspectorItem from 'components/BoxChooseInspectorType/InspectorItem';
import BoxConfirmBooking from 'components/BoxConfirmBooking';
import ShowCheckinCheckout from 'components/BoxConfirmBooking/ShowCheckinCheckout';
import BoxCustomerInformation from 'components/BoxCustomerInformation';
import BoxDirectTransfer from 'components/BoxDirectTransfer';
import BoxPaymentBaoKim from 'components/BoxPaymentBaoKim';
import WebViewBaoKim from 'components/BoxPaymentBaoKim/WebViewBaoKim';
import BoxRenewalBooking from 'components/BoxRenewalBooking';
import ChooseDayBookingLT from 'components/ChooseDayBookingLT';
import CollectionScreen from 'components/Collections/CollectionScreen';
import EditProfile from 'components/EditProfile';
import Filter from 'components/Filter';
import ListRooms from 'components/ListRooms';
import BoxDetailRoom from 'components/LTRoom/BoxDetailRoom';
import BoxBookingRoom from 'components/LTRoom/BoxDetailRoom/BoxBookingRoom';
import BoxImageLT from 'components/LTRoom/BoxDetailRoom/BoxImageLT';
import ReNewalBooking from 'components/ReNewalBooking';
import SearchSuggest from 'components/SearchComponent';
import Settings from 'components/Settings';
import MyMapView from 'modules/MapView';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BottomNavigation from './BottomNavigation';
import MerchantInfo from 'components/Profile/Merchant';

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
    MerchantInfo: { screen:  MerchantInfo},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: () => null,
    }),
  },
);

export default createAppContainer(stackNavigator);

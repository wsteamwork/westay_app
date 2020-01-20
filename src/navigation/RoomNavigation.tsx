import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import BoxImageLT from 'components/LTRoom/BoxDetailRoom/BoxImageLT';
import BoxDetailRoom from 'components/LTRoom/BoxDetailRoom';

const stackNavigator = createStackNavigator({
  BoxImageLT: { screen: BoxImageLT },
  BoxDetailRoom: { screen: BoxDetailRoom },
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    header: () => null,
  }),
});

export default createAppContainer(stackNavigator);

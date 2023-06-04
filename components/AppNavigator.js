import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import UserInterfacePage from './UserInterfacePage';
import MySightings from './MySightings'; // this is your MySightings page

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={UserInterfacePage} />
                <Drawer.Screen name="MySightings" component={MySightings} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

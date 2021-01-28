// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import History from '../ContactHistory';
import Register from '../Register';

// const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <div>navigation</div>
        // <NavigationContainer>
        //     <Stack.Navigator initialRouteName="Home">
        //         <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        //         <Stack.Screen name="History" component={History} />
        //         <Stack.Screen name="Register" component={Register} />
        //     </Stack.Navigator>
        // </NavigationContainer>
    );
}

export default Navigation;

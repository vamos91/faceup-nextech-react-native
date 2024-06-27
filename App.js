import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from './src/screens/About'
import NameProvider from './src/context/NameProvider';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import Home from './src/screens/Home';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NameProvider>
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="signupScreen" component={SignupScreen} />
            <Stack.Screen name="signinScreen" component={SigninScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
      </NavigationContainer>
    </NameProvider>
   
  );
}


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PageA from './PageA';
import PageB from './PageB';
import ProfileScreen from './ProfileScreen';
import { FontAwesome } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

const About = () => {
    return (
        <Tab.Navigator 
        screenOptions={({route}) => ({
            tabBarIcon: ({color}) => {
                let iconName;
                if(route.name === "pageA"){
                    iconName = "map-marker"
                }else if(route.name === "pageB"){
                    iconName = "heart"
                }else if (route.name === "profile"){
                    iconName = "user"
                }
                return <FontAwesome name={iconName} size={24} color="black" />
            }
        })}
        >
            <Tab.Screen name="pageA" component={PageA} />
            <Tab.Screen name="pageB" component={PageB} />
            <Tab.Screen name="profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default About;
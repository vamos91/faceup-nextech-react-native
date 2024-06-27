import React, { useState, useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { NameContext } from '../context/NameProvider';

const Home = ({ navigation }) => {
    const {setName, name} = useContext(NameContext)
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Input 
                onChangeText={(value) => setName(value)}
                value={name}
            />
            <Button 
                title="Get started"
                onPress={() => navigation.navigate('About')}
                />
        </View>
    );
};

export default Home;
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SigninScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const sendData = async () => {
        console.log(email, password)
        const user = await fetch('http://192.168.1.41:3001/auth/signin', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        if(user.status === 200){
            const userData = await user.json()
            console.log(userData.token)
            AsyncStorage.setItem('token', JSON.stringify(userData.token))
            navigation.navigate('About')
        }else{
            console.log(await user.json())
        }  
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Input
                placeholder='Email'
                onChangeText={(value) => setEmail(value)}
                
            />
            <Input
                placeholder='Password'
                onChangeText={(value) => setPassword(value)}
                
            />
            <Button
                onPress={() => sendData()}
                title="Signin"
            /> 
    </View>
    );
};

export default SigninScreen;
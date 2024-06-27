import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from '@rneui/themed';


const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const sendData = async () => {
        console.log(email, password, confirmPassword)
        const user = await fetch('http://192.168.1.41:3001/auth/signup', {
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
            //=> redirect to signin screen
            navigation.navigate('signinScreen')
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
            <Input
                placeholder='Confirm password'
                onChangeText={(value) => setConfirmPassword(value)}
            />
            <Button
                onPress={() => sendData()}
                title="Signup"
            /> 
            <Button
                title="Already signup ? Go to signin screen." 
                type="outline"
                onPress={() => navigation.navigate('signinScreen')}
            />
        </View>
    );
};

export default SignupScreen;
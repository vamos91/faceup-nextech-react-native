import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CameraView, useCameraPermissions } from 'expo-camera';


const PageB = ({navigation}) => {
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    let cameraRef = useRef(null) 

    useEffect(() => {
        (async() => {
            const {status} = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])


    const getToken = () => {
        AsyncStorage.getItem('token', (error, data) => {
            console.log(JSON.parse(data))
        })
    }

    const clearStorage = () => {
        AsyncStorage.removeItem('token')
        navigation.navigate('signinScreen')
    }

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
      }

    if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
        </View>
    );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
      }

   

    if(permission.granted){
        return(
            <View style={styles.container}>
                <CameraView style={styles.camera} facing={facing} ref={ref => (cameraRef = ref)}>
                    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={async () => {
                        if(cameraRef){
                            let photo = await cameraRef.takePictureAsync({
                                quality: 0.7,
                                base64: true,
                                exif: true
                            })
                            console.log(photo.uri)
                            var data = new FormData()
                            data.append('avatar', {
                                uri: photo.uri,
                                type: 'image/jpeg',
                                name: 'splash.png'
                            })
                            console.log(data)
                            const dataFromBack = await fetch('http://192.168.1.41:3001/upload', {
                                method: 'POST',
                                headers:{
                                    "Content-type": "multipart/form-data"
                                },
                                body: data
                            })
                            console.log('dataFromBack', dataFromBack)
                        }
                    }}>
                        <Text style={styles.text}>Take picture</Text>
                    </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        )
    }else{
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'red'}}>
                <Text>Page B</Text>
                <Button
                    title='Home'
                    onPress={() => navigation.navigate('signupScreen')}
                />
                <Button 
                    title='Get Token'
                    onPress={() => getToken()}
                />
                <Button 
                    title="Clear localstorage"
                    onPress={() => clearStorage()}
                />
                <Button 
                    title="Upload image"
                    onPress={() => sendDataToBack()}
                />
            </View>
        );
    }

    
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
  });

export default PageB;
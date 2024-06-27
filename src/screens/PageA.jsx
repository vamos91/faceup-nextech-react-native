import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { NameContext } from '../context/NameProvider';
import MapView from 'react-native-maps';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';
import { Button, Overlay, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppartmentListItem from '../components/AppartmentListItem';
import Feather from '@expo/vector-icons/Feather';
import AutoComplete from '../components/AutoComplete';
import { FontAwesome } from '@expo/vector-icons';


const PageA = ({navigation}) => {
    const {name} = useContext(NameContext)
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [coordonates, setCoordonates] = useState({})
    const [token, setToken] = useState('')
    const [markerList, setMarkerList] = useState([])
    const [isAddFlat, setIsAddFlat] = useState(false)
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [dataFlatInfo, setDataFlatInfo] = useState(null)
    
    useEffect(() => {
      console.log('loading data event...')
      AsyncStorage.getItem('token', (error, data) => {
        console.log('token in localstorage', JSON.parse(data))
        const getMarker = async () => {
          const markers = await fetch('http://192.168.1.41:3001/event', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(data)}`
            }
          })
  
          if(markers.status === 200){
            const markersJson = await markers.json()
            setMarkerList(markersJson)
          }else{
            console.log(await markers.json())
          }
          
        }
        getMarker()
        setToken(JSON.parse(data))
    })
    }, [coordonates])

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          let location = await Location.getCurrentPositionAsync({})
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
        })();
      }, [coordonates]);
      
      const getCoordonate = async (data) => {
        console.log(dataFlatInfo)
        setDataFlatInfo(null)
        if(isAddFlat){
          setCoordonates(data)
          setVisible(!visible);  
        }
      }

      const borderColor = {
        borderStyle: 'solid', 
        borderWidth: 2, 
        borderColor: "red"}
  
        const sendDataToBack = async () => {
          console.log(coordonates)
          const dataFromBack = await fetch('http://192.168.1.41:3001/event', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                title: "Appart vue sur mer",
                description: 'description flat',
                price: '99.99',
                lat: coordonates.latitude,
                lon: coordonates.longitude
            })
        })
        if(dataFromBack.status === 200){
          console.log('sendDataToBack', await dataFromBack.json()) 
          setVisible(false)
        }
          
        }

        const HandleCoord = (lat, lon) => {
          console.log(lat, lon)
          setLatitude(lat)
          setLongitude(lon)
        }
    return (
        <View style={[styles.container, isAddFlat ? borderColor : null]}>
          <Overlay style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} fullScreen={true} isVisible={visible} >
          <Input
                placeholder='Title'
                onChangeText={(value) => setTitle(value)}
            />
            <Input
                placeholder='description'
                onChangeText={(value) => setDesc(value)}
            />
            <Input
                placeholder='price'
                onChangeText={(value) => setPrice(value)}
            />
            <Button 
              title="Send"
              onPress={() => sendDataToBack()}
            />
            <Button 
              title="Close"
              onPress={() => setVisible(false)}
            />
          </Overlay>
            {
                latitude && longitude && (
                  <>
                  <MapView 
                  provider={PROVIDER_GOOGLE}
                  onPress={(e) => getCoordonate(e.nativeEvent.coordinate)}
                  style={styles.map} 
                  initialRegion={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                  }}   
            > 
            
                    <Marker coordinate={{
                        latitude: latitude,
                        longitude: longitude}}
                        draggable
                        />
                    {
                      markerList.length > 0 && markerList.map((marker, item) => (
                        <Marker key={item} coordinate={{
                          latitude: marker.lat,
                          longitude: marker.lon}}
                          title="1bd appartment"
                          onPress={() => setDataFlatInfo(marker)}
                          >
                            <View >
                              <Text style={{
                                backgroundColor: 'white', 
                                padding: 3, 
                                paddingHorizontal: 10,
                                borderWidth: 1, 
                                borderColor: 'gray', 
                                borderRadius: 20,
                                fontWeight: 'bold'
                                }}>{marker.price} €</Text>
                            </View>
                          </Marker>
                      ))
                    } 
                </MapView>
                <View style={styles.autoComplete}>
                  <AutoComplete getCoordFromGoogleMap={HandleCoord} />
                </View>
                <View style={styles.profileButton}>
                  <Feather name="user" size={32} color="gray" onPress={() => navigation.navigate('profile')} />
                </View>
                <View style={styles.addButton}>
                  <Button title="Add Flat" onPress={() => setIsAddFlat(!isAddFlat)}></Button>
                </View>
                
                <View style={styles.card}>
                {
                  dataFlatInfo !== null  && (
                    <AppartmentListItem appartment={dataFlatInfo} />
                  )
                }
                </View>
                </>
                )   
            }    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      //marginTop: 50,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileButton:{
      position: 'absolute', 
      top: 50, 
      right: 20,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 20
    },
    autoComplete:{
      position: 'absolute', 
      top: 50, 
      left: 20,
      width: 250
    },
    addButton:{
      position: 'absolute',
      bottom: 30,
      left: 10
    },
    map: {
      position: 'relative',
      flex:1,
      width: '100%',
      height: '100%',
    },
    card:{
      position: 'absolute',
      bottom: 10,
      left: 10,
      right: 10,
    }
  });

export default PageA;
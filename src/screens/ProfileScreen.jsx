import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import AppartmentListItem from '../components/AppartmentListItem'
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const [flats, setFlats] = useState([])
    useEffect(() => {
        AsyncStorage.getItem('token', (error, data) => {
          console.log('token in localstorage', JSON.parse(data))
          const getFlats = async () => {
            const flat = await fetch('http://192.168.1.41:3001/event/user', {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${JSON.parse(data)}`
              }
            })
    
            if(flat.status === 200){
                console.log(flat)
              const flatJson = await flat.json()
              setFlats(flatJson)
            }else{
              console.log(await flat.json())
            }
          }
          getFlats()
      })
      }, [])

  return (
    <ScrollView style={styles.container} 
    showsVerticalScrollIndicator={false}
    >
        {
            flats.map((flat, index) => (
                <AppartmentListItem key={index} appartment={flat} />
            ))
        }
       
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 50,
        width: '90%',
        margin: 'auto'
    }
})
export default ProfileScreen
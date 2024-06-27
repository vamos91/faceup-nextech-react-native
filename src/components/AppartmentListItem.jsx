import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'
import React from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';


export default function AppartmentListItem({appartment}) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: 'https://d6644ef6a12fcfb82f3f-5d6761b1e7eae8e264ad220502fbb6f0.ssl.cf5.rackcdn.com/a1c0b876-61e6-4ec3-8c05-ca96ca60e2d1/images/pickaflatphoto2.jpg'}} />
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{appartment.title}</Text>
        <Text style={styles.title}>{appartment.price}</Text>
        <Fontisto style={styles.heart} name="heart" size={24} color="gray" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        marginTop: 10,     
        borderRadius: 20,
        overflow: 'hidden',
        flexDirection: 'row'
    },
    title: {
        marginTop: 10,
        fontWeight: 'bold'
    },
    rightContainer: {
        marginLeft: 10,
        flex: 2
    },
    image: {
        width: 120,
        aspectRatio: 1,
        backgroundColor: 'gray'
    },
    heart:{
      position: 'absolute',
      right: 10,
      top: 10,
    }
})
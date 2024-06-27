import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const AutoComplete = ({getCoordFromGoogleMap}) => {
    const getCoord = (lat, lon) => {
        getCoordFromGoogleMap(lat, lon)
    }
  return (
    <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            width: '100%',
            //backgroundColor: 'grey',
          },
          textInput: {
            height: 50,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
            onPress={(data, details = null) => {
                getCoord(details.geometry.location.lat, details.geometry.location.lng)
            }}
            query={{
                key: 'AIzaSyCdcrwCTRbeNmrQP_5m6uApSo5jiWe-MP8',
                language: 'fr',
            }}
/>
  )
}

export default AutoComplete
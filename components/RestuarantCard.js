import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {MapPinIcon} from 'react-native-heroicons/outline'
import {StarIcon} from 'react-native-heroicons/solid'

const RestuarantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        })
      }}
      className="bg-white mr-3 shadow-sm rounded-sm"
    >
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-2 mb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon opacity={0.5} size={20} color="green" />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon color="gray" opacity={0.4} size={22} />
          <Text className>
            Nearby - {address.length > 20 ? `${address.slice(0, 20)}...` : address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestuarantCard

import React, {useEffect, useState} from 'react'
import {ScrollView, Text, View} from 'react-native'
import {ArrowRightIcon} from 'react-native-heroicons/outline'
import sanityClient from '../sanity'
import RestuarantCard from './RestuarantCard'

const FeaturedRow = ({title, description, id}) => {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured" && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type-> {
              name
            }
          }
        }[0]
    `,
        {id}
      )
      .then((data) => setRestaurants(data?.restaurants))
  }, [])
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4 pb-2">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {/* restaurant cards */}
        {restaurants?.map((restaurant) => (
          <RestuarantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre="Japanese"
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow

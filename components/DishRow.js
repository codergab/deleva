import React, {useState} from 'react'
import Currency from 'react-currency-formatter'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {MinusCircleIcon, PlusCircleIcon} from 'react-native-heroicons/outline'
import {useDispatch, useSelector} from 'react-redux'
import {addToBasket, removeFromBasket, selectBasketItemsWithId} from '../features/basketSlice'
import {urlFor} from '../sanity'

const DishRow = ({id, name, description, price, image}) => {
  const [isPressed, setIsPressed] = useState(false)
  const items = useSelector((state) => selectBasketItemsWithId(state, id))
  const dispatch = useDispatch()

  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id,
        name,
        description,
        price,
        image,
      })
    )
  }
  const removeItemFromBasket = () => {
    if (!items.length) return

    dispatch(removeFromBasket({id}))
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && 'border-b-0'}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text>
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className="h-20 w-20 bg-gray-300"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 py-2">
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon size={35} color={items.length ? '#00CCBB' : 'gray'} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={35} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow

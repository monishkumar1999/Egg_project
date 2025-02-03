import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'lucide-react-native'

const Home = () => {
  return (
    <View>
        <View className="flex">
        <Image source={{ uri: "your_image_url" }}  style={styles.image}/>
            <Text>Welcome back</Text>
        </View>
    
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
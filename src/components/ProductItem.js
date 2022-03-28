import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AppText from './AppText'

const width = Dimensions.get('window').width

const ProductItem = props => {
	return (
		<TouchableOpacity style={styles.container} onPress={() => console.log('cc')}>
			<Image
				source={{
					uri: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
				}}
				resizeMode='cover'
				style={styles.image}
			/>
			<View style={styles.info}>
				<AppText text='Product Item' />
				<AppText text='100.000đ' />
			</View>
		</TouchableOpacity>
	)
}

export default ProductItem

const styles = StyleSheet.create({
	container: {
		width: width / 2 - 15,
		elevation: 5,
		backgroundColor: '#fff',
		marginBottom: 20,
	},
	image: {
		width: '100%',
		height: 200,
	},
	info: {
		padding: 10,
	},
})

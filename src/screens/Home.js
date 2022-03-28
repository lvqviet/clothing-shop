import {
	StyleSheet,
	View,
	Button,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	SafeAreaView,
} from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../redux'
import { AppText, Banner, ProductItem } from '../components'
import Entypo from '@expo/vector-icons/Entypo'

const Home = ({ navigation }) => {
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)

	const onClick = () => {
		dispatch(actions.cart.add_cart(2))
	}

	return (
		<SafeAreaView style={{ flex: 1, paddingTop: 25 }}>
			<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
				<Header navigation={navigation} />
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
					<Banner />

					<View
						style={{
							flexWrap: 'wrap',
							width: '100%',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							marginTop: 30,
						}}
					>
						{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, index) => (
							<ProductItem key={index} />
						))}
					</View>

					<AppText text='Home Page' />
					<AppText text={cart.total} />

					<Button title='test' onPress={onClick} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const Header = ({ navigation }) => (
	<SafeAreaView
		style={{
			display: 'flex',
			width: '100%',
			paddingHorizontal: 15,
			flexDirection: 'row',
			paddingVertical: 10,
			backgroundColor: '#fff',
			justifyContent: 'space-between',
		}}
	>
		<TextInput
			style={{
				borderRadius: 10,
				borderWidth: 1,
				width: '70%',
				paddingHorizontal: 10,
				fontFamily: 'Poppins_400Regular',
			}}
			placeholder='Search...'
		/>

		<TouchableOpacity
			style={{ alignItems: 'center', justifyContent: 'center' }}
			onPress={() => navigation.navigate('LOGIN')}
		>
			<AppText text='Log in' />
		</TouchableOpacity>
		<TouchableOpacity onPress={() => console.log('cart')}>
			<Entypo name='shopping-cart' size={24} color='black' />
		</TouchableOpacity>
	</SafeAreaView>
)

export default Home

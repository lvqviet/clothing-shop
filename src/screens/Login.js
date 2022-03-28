import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Login = () => {
	const cart = useSelector(state => state.cart)

	return (
		<View>
			<Text>Login</Text>
			<Text>{cart.total}</Text>
		</View>
	)
}

export default Login

const styles = StyleSheet.create({})

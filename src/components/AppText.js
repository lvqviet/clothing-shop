import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AppText({ text, color, fontSize, fontWeight }) {
	return (
		<Text
			style={{
				fontSize: fontSize ?? 12,
				color: color ?? '#333',
				fontWeight: fontWeight ?? '400',
				fontFamily: 'Poppins_400Regular',
			}}
		>
			{text}
		</Text>
	)
}

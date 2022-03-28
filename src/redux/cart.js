import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	cart: [],
	total: 0,
	totalAfterDiscount: 0,
	selectAll: false,
	coupon: {},
}

const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		add_cart: (state, action) => {
			let payload = action.payload
			// const newCart = { ...state }

			return { ...state, total: state.total + payload }
		},
	},
})

export const cartActions = slice.actions
export const cartReducers = slice.reducer

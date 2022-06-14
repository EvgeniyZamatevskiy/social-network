import { UsersType } from '../../../api/usersAPI'
import { UsersReducerActionsType } from './actions'

const initState: InitStateType = {
	users: [],
	count: 5,
	page: 1,
	totalUsersCount: 0
}

export const usersReducer = (state: InitStateType = initState, action: UsersReducerActionsType): InitStateType => {
	switch (action.type) {
		case 'FOLLOW':
			return { ...state, users: state.users.map(u => u.id === action.userId ? { ...u, followed: true } : u) }
		case 'UN-FOLLOW':
			return { ...state, users: state.users.map(u => u.id === action.userId ? { ...u, followed: false } : u) }
		case 'SET-USERS':
			return { ...state, users: action.users.map(u => ({ ...u, disabledStatus: false })) }
		case 'SET-CURRENT-PAGE':
			return { ...state, page: action.currentPage }
		case 'SET-TOTAL-USERS-COUNT':
			return { ...state, totalUsersCount: action.totalUsersCount }
		case 'TOGGLE-DISABLED-STATUS':
			return { ...state, users: state.users.map(u => u.id === action.userId ? { ...u, disabledStatus: action.isDisabled } : u) }

		default:
			return state
	}
}

export type UsersSupplementedType = UsersType & {
	disabledStatus: boolean
}

// types
type InitStateType = {
	users: UsersSupplementedType[]
	count: number
	page: number
	totalUsersCount: number
}
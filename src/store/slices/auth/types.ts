import { Nullable } from 'types'

export type AuthSliceInitialStateType = {
	isAuth: boolean
	isInitializedApp: boolean
	userData: Nullable<UserDataType>
	captchaUrl: Nullable<string>
}

export type UserDataType = {
	id: number
	email: string
	login: string
}

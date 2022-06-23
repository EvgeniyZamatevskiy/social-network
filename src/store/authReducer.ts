import { AUTH } from 'api'
import { SECURITY } from 'api/security'
import { LoginParamsType } from 'api/types'
import { ThunkType } from 'store/store'
import { Nullable } from 'types'

const initialState: InitialStateType = {
	isAuth: false,
	isInitialize: false,
	email: null,
	id: null,
	login: null,
	captchaUrl: null
}

export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionsType): InitialStateType => {
	switch (action.type) {
		case 'auth/SET-IS-AUTH':
			return { ...state, isAuth: action.isAuth }
		case 'auth/SET-USER-DATA':
			return { ...state, ...action.userData }
		case 'auth/SET-IS-INITIALIZE-APP':
			return { ...state, isInitialize: action.isInitialize }
		case 'auth/GET-CAPTCHA-URL':
			return { ...state, captchaUrl: action.url }

		default:
			return state
	}
}

// ActionCreators
export const setUserDataAC = (userData: UserDataType) => ({ type: 'auth/SET-USER-DATA', userData } as const)

export const setIsAuthAC = (isAuth: boolean) => ({ type: 'auth/SET-IS-AUTH', isAuth } as const)

export const setIsInitializeAppAC = (isInitialize: boolean) => ({ type: 'auth/SET-IS-INITIALIZE-APP', isInitialize } as const)

export const getCaptchaUrlAC = (url: string) => ({ type: 'auth/GET-CAPTCHA-URL', url } as const)

// ThunksCreators
export const getUserDataTC = (): ThunkType => async (dispatch) => {
	try {
		const response = await AUTH.me()
		const { data: userData, resultCode, messages } = response.data

		if (resultCode === 0) {
			dispatch(setUserDataAC(userData))
			dispatch(setIsAuthAC(true))
		} else {
			alert(messages[0])
		}
	} catch (error: any) {
		alert(error.message)
	}
}

export const loginTC = (loginParams: LoginParamsType): ThunkType => async (dispatch) => {
	try {
		const response = await AUTH.login(loginParams)
		const { messages, resultCode } = response.data

		if (resultCode === 0) {
			dispatch(getUserDataTC())
		} else {
			if (resultCode === 10) {
				dispatch(getCaptchaTC())
			}
			alert(messages[0])
		}

	} catch (error: any) {
		alert(error.message)
	}
}

export const logoutTC = (): ThunkType => async (dispatch) => {
	try {
		const response = await AUTH.logout()
		const { messages, resultCode } = response.data

		if (resultCode === 0) {
			const resetUserData = { email: null, id: null, login: null }
			dispatch(setUserDataAC(resetUserData))
			dispatch(setIsAuthAC(false))
		} else {
			alert(messages[0])
		}
	} catch (error: any) {
		alert(error.message)
	}
}

export const initializeAppTC = (): ThunkType => async (dispatch) => {
	try {
		const response = await AUTH.me()
		const { messages, resultCode } = response.data

		if (resultCode === 0) {
			dispatch(getUserDataTC())
		} else {
			alert(messages[0])
		}
	} catch (error: any) {
		alert(error.message)
	} finally {
		dispatch(setIsInitializeAppAC(true))
	}
}

export const getCaptchaTC = (): ThunkType => async (dispatch) => {
	try {
		const response = await SECURITY.getCaptcha()
		const { url } = response.data

		dispatch(getCaptchaUrlAC(url))
	} catch (error: any) {
		alert(error.message)
	}
}

//types
type UserDataType = {
	id: Nullable<number>
	email: Nullable<string>
	login: Nullable<string>
}

export type InitialStateType = {
	isAuth: boolean
	isInitialize: boolean
	email: Nullable<string>
	id: Nullable<number>
	login: Nullable<string>
	captchaUrl: Nullable<string>
}

export type AuthReducerActionsType =
	ReturnType<typeof setIsAuthAC> |
	ReturnType<typeof setUserDataAC> |
	ReturnType<typeof setIsInitializeAppAC> |
	ReturnType<typeof getCaptchaUrlAC>

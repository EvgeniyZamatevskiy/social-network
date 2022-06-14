import { instance } from './instance'
import { PhotosType } from './usersAPI'

export const profileAPI = {
	getUserProfile(userId: string) {
		return instance.get<UserProfileResponseType>(`profile/${userId}`)
	}
}

// profile
export type UserProfileResponseType = {
	aboutMe: null | string
	contacts: ContactsType
	lookingForAJob: boolean
	lookingForAJobDescription: null | string
	fullName: string
	userId: number
	photos: PhotosType
}

export type ContactsType = {
	facebook: null | string
	website: null | string
	vk: null | string
	twitter: null | string
	instagram: null | string
	youtube: null | string
	github: null | string
	mainLink: null | string
}
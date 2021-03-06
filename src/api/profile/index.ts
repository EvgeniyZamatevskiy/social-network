import { instance } from 'api/config'
import { CommonResponseType } from 'api/types'
import { UserProfileType, SavePhotoResponseDataType } from './types'

const settings = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
}

export const PROFILE = {
	getUserProfile(userId: number) {
		return instance.get<UserProfileType>(`profile/${userId}`)
	},
	getUserStatus(userId: number) {
		return instance.get<string>(`profile/status/${userId}`)
	},
	updateUserStatus(status: string) {
		return instance.put<CommonResponseType>('profile/status', { status })
	},
	updateUserPhoto(image: File) {
		const formData = new FormData()
		formData.append('image', image)

		return instance.put<CommonResponseType<SavePhotoResponseDataType>>('profile/photo', formData, settings)
	},
	updateUserProfile(userProfile: UserProfileType) {
		return instance.put<CommonResponseType>('profile', userProfile)
	},
}

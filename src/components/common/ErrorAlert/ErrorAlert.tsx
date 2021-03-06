import { EMPTY_STRING } from 'constants/base'
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'store/hooks'
import { selectErrorMessage } from 'store/selectors'
import { setErrorMessage } from 'store/slices/app'
import { ReturnComponentType } from 'types/ReturnComponentType'
import style from './ErrorAlert.module.scss'

const DELAY = 3000

export const ErrorAlert: FC = (): ReturnComponentType => {

	const dispatch = useAppDispatch()

	const errorMessage = useSelector(selectErrorMessage)

	const onCloseErrorAlertClick = (): void => {
		dispatch(setErrorMessage(EMPTY_STRING))
	}

	const resetErrorMessage = (): void => {
		dispatch(setErrorMessage(EMPTY_STRING))
	}

	useEffect(() => {
		if (errorMessage) {
			setTimeout(() => {
				resetErrorMessage()
			}, DELAY)
		}
	}, [errorMessage])

	return (
		<div className={`${style.errorAlert} ${!errorMessage && style.closeErrorAlert}`}>
			<div className={style.alert}>{errorMessage}</div>
			<button onClick={onCloseErrorAlertClick}>&#10006;</button>
		</div>
	)
}

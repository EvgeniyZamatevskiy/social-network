import { RootReducerType } from 'store/store'
import { Nullable } from 'types'

export const selectError = (state: RootReducerType): Nullable<string> => state.app.error

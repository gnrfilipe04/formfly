import { Alert } from "react-native"
import R from 'ramda'

export const leftAlert = (title: string, body: string, error: unknown) => {
    return Alert.alert(title, body)
}

export const capitalize = R.replace(/^./, R.toUpper);

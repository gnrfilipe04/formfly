import { Alert } from "react-native"

export const leftAlert = (title: string, body: string, error: unknown) => {
    return Alert.alert(title, body)
}
import { Text } from "@/src/components/Themed";
import { OSHeaderDTO } from "@/src/domain/types/OSHeaderDTO";
import { useLocalSearchParams } from "expo-router";

export default function Note(){
    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <Text>{id}</Text>
    )
}
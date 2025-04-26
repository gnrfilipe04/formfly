import { useLocalSearchParams } from "expo-router";
import { FertigationForm } from "@/src/components/FertigationForm";

export default function Note() {
    const { id, noteId } = useLocalSearchParams<{ id: string, noteId?: string }>()

    return (
        <FertigationForm orderId={id} noteId={noteId} />
    )
}


import { useLocalSearchParams } from "expo-router";
import { FertigationForm } from "@/src/components/FertigationForm";
import { ProductionForm } from "@/src/components/ProductionForm";
import { SupplyForm } from "@/src/components/SupplyForm";
import { PlantForm } from "@/src/components/PlantForm";
import { Text } from "@/src/components/Themed";
import { useOSStore } from "@/src/store/useOSStore";

export default function Note() {
    const { id, noteId } = useLocalSearchParams<{ id: string, noteId: string }>()
    const { orders } = useOSStore()
    const order = orders[id]

    const handleShowForm = (type: 'production' | 'supply' | 'plant' | 'fertigation') => {
        const typeMap = {
            'production': <ProductionForm orderId={id} noteId={noteId} />,
            'supply': <SupplyForm orderId={id} noteId={noteId} />,
            'plant': <PlantForm orderId={id} noteId={noteId} />,
            'fertigation': <FertigationForm orderId={id} noteId={noteId} />
        }

        return typeMap[type] || <Text>Tipo de nota não encontrado</Text>
    }

    return handleShowForm(order.header.type)
}


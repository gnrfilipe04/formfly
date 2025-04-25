import { Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, } from 'react-native';
import { View } from "@/src/components/Themed";
import { useFertigationOSStore } from "@/src/store/useFertigationOSStore";
import { capitalize } from "@/src/utils/helpers";


export default function Note() {
    const { id } = useLocalSearchParams<{ id: string }>()

    const { orders } = useFertigationOSStore()

    const order = orders[id]

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                        <Text style={styles.title}>nº {order.header.title}</Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{capitalize(order.header.type)}</Text>
                        </View>
                    </View>
                    <Text>{new Date().toLocaleDateString()}</Text>
                </View>
                <Text style={styles.description}>{order.header.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    badge: {
        backgroundColor: '#2cab3b',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    badgeText: {
        color: '#fff',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 8
    },
    footer: {

    }
})
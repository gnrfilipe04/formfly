import { Text } from "@/src/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Pressable } from 'react-native';
import { View } from "@/src/components/Themed";
import { useFertigationOSStore } from "@/src/store/useFertigationOSStore";
import { capitalize } from "@/src/utils/helpers";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import z from 'zod'
import { FormProvider, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledInput } from "@/src/components/ControlledInput";

export default function Note() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { orders } = useFertigationOSStore()
    const order = orders[id]

    const noteSchema = z.object({
        operatorName: z.string().min(1, "Nome do operador é obrigatório"),
        date: z.date(),
        quantity: z.number().min(0, "Quantidade deve ser maior que 0"),
        observations: z.string().optional()
    });

    type NoteFormData = z.infer<typeof noteSchema>;

    const methods = useForm<NoteFormData>({
        resolver: zodResolver(noteSchema),
    })

    const onSubmit = (data: NoteFormData) => {
        console.log(data);
    };

    const { field: dateField } = useController({
        name: 'date',
        control: methods.control,
        defaultValue: new Date(),
    })

    return (
        <FormProvider {...methods}>
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
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome do Operador</Text>
                    <ControlledInput
                        style={[styles.input, methods.formState.errors.operatorName && styles.inputError]}
                        placeholder="Digite o nome do operador"
                        name="operatorName"
                    />
                    {methods.formState.errors.operatorName && (
                        <Text style={styles.errorText}>{methods.formState.errors.operatorName.message}</Text>
                    )}
                </View>

                <View style={styles.rowContainer}>
                    <View style={[styles.inputContainer, { flex: 1 }]}>
                        <Text style={styles.label}>Data</Text>
                        <DateTimePicker
                            value={dateField.value}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                if (selectedDate) {
                                    dateField.onChange(selectedDate);
                                }
                            }}
                        />
                    </View>

                    <View style={[styles.inputContainer, { flex: 1 }]}>
                        <Text style={styles.label}>Quantidade</Text>
                        <ControlledInput
                            style={[styles.input, methods.formState.errors.quantity && styles.inputError]}
                            placeholder="Digite a quantidade"
                            name="quantity"
                        />
                        {methods.formState.errors.quantity && (
                            <Text style={styles.errorText}>{methods.formState.errors.quantity.message}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Observações</Text>
                    <ControlledInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Digite suas observações"
                        multiline
                        numberOfLines={4}
                        name="observations"
                    />
                </View>

                <Pressable 
                    style={[styles.button, { backgroundColor: '#2cab3b' }]}
                    onPress={methods.handleSubmit(onSubmit)}
                >
                    <Text style={styles.buttonText}>Enviar</Text>
                </Pressable>

                <Pressable 
                    style={[styles.button, { backgroundColor: '#425361' }]}
                    onPress={() => {}}
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </Pressable>
            </View>
            </View>
        </FormProvider>
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
    formContainer: {
        padding: 16,
        gap: 16,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
    },
    inputError: {
        borderColor: '#ff3b30',
    },
    errorText: {
        color: '#ff3b30',
        fontSize: 12,
        marginTop: 4,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-between',
    }
})
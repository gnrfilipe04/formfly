import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FormProvider, useController, useForm } from "react-hook-form";
import { View, Pressable, StyleSheet } from "react-native";
import { ControlledInput } from "./ControlledInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { productionFormSchema } from "../domain/entities/ProductionNote";
import { Text } from "./Themed";
import DateTimePicker from '@react-native-community/datetimepicker';
import { v4 as uuidv4 } from 'uuid';
import { capitalize } from "../utils/helpers";
import { useOSStore } from "../store/useOSStore";
import { useProductionOSStore } from "../store/useProductionOSStore";
import { OSProductionDTO } from "../domain/entities/OSProduction";

type ProductionFormProps = {
    orderId: string
    noteId?: string
}

export function ProductionForm({ noteId, orderId }: ProductionFormProps) {
    const { setNewNote, notes } = useProductionOSStore()
    const { orders } = useOSStore()
    const [showDatePicker, setShowDatePicker] = useState(false);
    const order = orders[orderId] as OSProductionDTO
    const note = noteId ? notes[noteId] : null

    type NoteFormData = z.infer<typeof productionFormSchema>;

    const methods = useForm<NoteFormData>({
        resolver: zodResolver(productionFormSchema),
        defaultValues: {
            operatorName: note?.data.operatorName,
            date: note?.data.date,
            quantity: note?.data.quantity,
            equipment: note?.data.equipment,
            type: note?.data.type,
            observations: note?.data.observations,
        }
    })

    const onSubmit = (data: NoteFormData) => {
        console.log(data);
    };

    const { field: dateField } = useController({
        name: 'date',
        control: methods.control,
        defaultValue: new Date().toISOString(),
    })

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
            <FormProvider {...methods}>
                <View style={styles.formContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome do Operador</Text>
                        <ControlledInput
                            style={[styles.input, methods.formState.errors.operatorName && styles.inputError]}
                            placeholder="Digite o nome do operador"
                            placeholderTextColor={'#666'}
                            name="operatorName"
                        />
                        {methods.formState.errors.operatorName && (
                            <Text style={styles.errorText}>{methods.formState.errors.operatorName.message}</Text>
                        )}
                    </View>

                    <View style={styles.rowContainer}>
                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Data</Text>
                            <Pressable
                                style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
                                onPress={() => setShowDatePicker(true)}
                            >
                                <Text>{new Date(dateField.value).toLocaleDateString()}</Text>
                                <MaterialIcons name="calendar-today" size={20} color="#666" />
                            </Pressable>
                            {showDatePicker && <DateTimePicker
                                value={new Date(dateField.value)}
                                mode="date"
                                display="calendar"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        dateField.onChange(selectedDate);
                                        setShowDatePicker(false);
                                    }
                                }}
                            />}
                        </View>

                        <View style={[styles.inputContainer, { flex: 1 }]}>
                            <Text style={styles.label}>Quantidade</Text>
                            <ControlledInput
                                style={[styles.input, methods.formState.errors.quantity && styles.inputError]}
                                placeholder="Digite a quantidade"
                                placeholderTextColor={'#666'}
                                name="quantity"
                                keyboardType="numeric"
                            />
                            {methods.formState.errors.quantity && (
                                <Text style={styles.errorText}>{methods.formState.errors.quantity.message}</Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Equipamento</Text>
                        <ControlledInput
                            style={[styles.input, methods.formState.errors.equipment && styles.inputError]}
                            placeholder="Digite o equipamento utilizado"
                            placeholderTextColor={'#666'}
                            name="equipment"
                        />
                        {methods.formState.errors.equipment && (
                            <Text style={styles.errorText}>{methods.formState.errors.equipment.message}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tipo</Text>
                        <View style={[styles.input, { flexDirection: 'row', gap: 16 }]}>
                            <Pressable
                                style={[
                                    styles.typeButton,
                                    methods.watch('type') === 'muda' && styles.typeButtonActive
                                ]}
                                onPress={() => methods.setValue('type', 'muda')}
                            >
                                <Text style={[
                                    styles.typeButtonText,
                                    methods.watch('type') === 'muda' && styles.typeButtonTextActive
                                ]}>Muda</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.typeButton,
                                    methods.watch('type') === 'semente' && styles.typeButtonActive
                                ]}
                                onPress={() => methods.setValue('type', 'semente')}
                            >
                                <Text style={[
                                    styles.typeButtonText,
                                    methods.watch('type') === 'semente' && styles.typeButtonTextActive
                                ]}>Semente</Text>
                            </Pressable>
                        </View>
                        {methods.formState.errors.type && (
                            <Text style={styles.errorText}>{methods.formState.errors.type.message}</Text>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Observações</Text>
                        <ControlledInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Digite suas observações"
                            multiline
                            placeholderTextColor={'#666'}
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
                        onPress={() => {
                            const newNote = {
                                id: note?.id || uuidv4(),
                                order,
                                data: {
                                    operatorName: methods.getValues('operatorName'),
                                    date: methods.getValues('date'),
                                    quantity: methods.getValues('quantity'),
                                    equipment: methods.getValues('equipment'),
                                    type: methods.getValues('type'),
                                    observations: methods.getValues('observations'),
                                    toSend: false,
                                    isSkecth: true
                                }
                            }
                            setNewNote(newNote)
                            router.push({ pathname: '/(tabs)/(savedNotes)/savedNotes', })
                        }}
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </Pressable>
                </View>
            </FormProvider>
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
    },
    typeButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    typeButtonActive: {
        backgroundColor: '#2cab3b',
        borderColor: '#2cab3b',
    },
    typeButtonText: {
        color: '#666',
        fontSize: 16,
    },
    typeButtonTextActive: {
        color: '#fff',
    }
}) 
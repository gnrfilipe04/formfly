import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/src/components/Themed';
import { getOSFertigationUseCase } from '@/src/di/Sync';
import { useHomeReducers } from '@/src/reducers/home';
import { Card } from '@/src/components/Card';
import { OSFertigation } from '@/src/domain/entities/OSFertigation';
import { useServerData } from '@/src/hooks/useServerData';
import { useRouter } from 'expo-router';
import z from 'zod'

export default function Orders() {
  const router = useRouter()

  const {
    fertigationStore
  } = useHomeReducers()

  const  { trigger, loading } = useServerData<typeof fertigationStore.orders>({
    get: () => getOSFertigationUseCase.execute(),
    set: fertigationStore.setOrders,
    validateSchema: z.record(z.string(), OSFertigation)
  })

  useEffect(() => {
    trigger()
  }, [])

  if(loading) return <ActivityIndicator />

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={fertigationStore.getOrders()}
        keyExtractor={(item) => item.header.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhuma ordem de serviço encontrada</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/(note)/note', params: { id: item.header.id } })}>
            <Card item={item.header}/>
          </Pressable>
        )}
      />
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

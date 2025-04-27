import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/src/components/Themed';
import { getOSFertigationUseCase } from '@/src/di/Sync';
import { Card } from '@/src/components/Card';
import { OSFertigation } from '@/src/domain/entities/OSFertigation';
import { useServerData } from '@/src/hooks/useServerData';
import { useNavigation, useRouter } from 'expo-router';
import z from 'zod'
import { useOSStore } from '@/src/store/useOSStore';
import { v4 as uuidv4 } from 'uuid';
import { HeaderSearchBarOptions } from '@react-navigation/elements';

export default function Orders() {
  const router = useRouter()
  const navigation = useNavigation()

  const osStore = useOSStore()

  const  { trigger, loading } = useServerData<typeof osStore.orders>({
    get: () => getOSFertigationUseCase.execute(),
    set: osStore.setOrders,
    validateSchema: z.record(z.string(), OSFertigation)
  })

  const searchBarOptions: HeaderSearchBarOptions = {
    cancelButtonText: 'Cancelar',
    placeholder: 'Pesquisar',
    onChangeText: (e) => osStore.setFilter(e.nativeEvent.text)
  }

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: searchBarOptions
    })
  }, [navigation])

  useEffect(() => {
    trigger()
  }, [])

  if(loading) return <ActivityIndicator />

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={osStore.getOrders(osStore.filter)}
        keyExtractor={(item) => item.header.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhuma ordem de serviço encontrada</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/(note)/note', params: { id: item.header.id, noteId: uuidv4() } })}>
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

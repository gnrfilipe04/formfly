import { ActivityIndicator, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/src/components/Themed';
import { Card } from '@/src/components/Card';
import { useRouter } from 'expo-router';
import { v4 as uuidv4 } from 'uuid';
import { RefreshControl } from 'react-native';
import { useOrdersController } from '@/src/domain/ui/controllers/useOrdersController';

export default function Orders() {

  const router = useRouter()

  const { loading, trigger, osStore } = useOrdersController()

  const badgeColors = {
    plant: '#c233af',
    production: '#257ed1',
    supply: '#de7b25',
    fertigation: '#2cab3b',
  }

  const badgeTextValues = {
    plant: 'Plantio',
    production: 'Produção',
    supply: 'Insumo',
    fertigation: 'Fertirrigação',
  }

  if(loading) return <ActivityIndicator />

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={osStore.getOrders(osStore.filter)}
        keyExtractor={(item) => item.header.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={trigger} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhuma ordem de serviço encontrada</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/(note)/note', params: { id: item.header.id, noteId: uuidv4() } })}>
            <Card 
              item={item.header}
              badgeTextValue={badgeTextValues[item.header.type]}
              badgeColor={badgeColors[item.header.type]}
            />
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

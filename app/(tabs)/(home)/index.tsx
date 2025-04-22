import { useEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/components/Themed';
import { Card } from '@/components/Card';
import { useFertigation } from '@/hooks/useFertigation';

export default function Orders() {

  const fertigation = useFertigation()

  useEffect(() => {
    fertigation.getOrders.trigger()
  }, [])

  if(fertigation.getOrders.isMutating) return <ActivityIndicator />

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={fertigation.data}
        keyExtractor={(item) => item.header.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhuma ordem de serviço encontrada</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => <Card item={item.header}/>}
      />
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

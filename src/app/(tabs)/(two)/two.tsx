import { FlatList, Pressable, StyleSheet, View as ViewThemed } from 'react-native';

import { ItemSeparator, Text, View } from '@/src/components/Themed';
import { useRouter } from 'expo-router';
import { Card } from '@/src/components/Card';
import { useFertigationOSStore } from '@/src/store/useFertigationOSStore';

export default function TabTwoScreen() {
  const router = useRouter()
  const fertigationStore = useFertigationOSStore()

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={fertigationStore.getNotes()}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhum apontamento encontrado</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/(note)/note', params: { id: item.order.header.id, noteId: item.id } })}>
            <Card item={item.order.header} showSketchBadge={item.data.toSend} />
          </Pressable>
        )}
      />
    </ViewThemed>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

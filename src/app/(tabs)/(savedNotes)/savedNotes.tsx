import { FlatList, Pressable, StyleSheet, View as ViewThemed } from 'react-native';

import { ItemSeparator, Text, View } from '@/src/components/Themed';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { Card } from '@/src/components/Card';
import { FertigationNoteDTO } from '@/src/domain/types/FertigationNoteDTO';
import { useNoteStore } from '@/src/store/useNoteStore';
import { useCallback, useEffect } from 'react';
import { useFertigationOSStore } from '@/src/store/useFertigationOSStore';
import { useProductionOSStore } from '@/src/store/useProductionOSStore';
import { useSupplyOSStore } from '@/src/store/useSupplyOSStore';
import { usePlantOSStore } from '@/src/store/usePlantOSStore';
import { HeaderSearchBarOptions } from '@react-navigation/elements';


export default function SavedNotes() {
  const navigation = useNavigation()
  const router = useRouter()
  const noteStore = useNoteStore()
  const fertigationStore = useFertigationOSStore()
  const plantStore = usePlantOSStore()
  const productionStore = useProductionOSStore()
  const supplyStore = useSupplyOSStore()

  const badgeText = (item: FertigationNoteDTO) => {
    if (item.data.isSkecth) return 'Rascunho'
    if (item.data.toSend) return 'Pronto'
    return ''
  }

  const searchBarOptions: HeaderSearchBarOptions = {
    cancelButtonText: 'Cancelar',
    placeholder: 'Pesquisar',
    onChangeText: (e) => noteStore.setFilter(e.nativeEvent.text)
  }

  useFocusEffect(
    useCallback(() => {
      const notes = noteStore.unionNotes(
        fertigationStore.notes,
        plantStore.notes,
        productionStore.notes,
        supplyStore.notes
      )
  
      noteStore.setNotes(notes)

      return () => {};
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: searchBarOptions
    })
  }, [navigation])

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={noteStore.getNotes(noteStore.filter)}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 60}}>
            <Text>Nenhum apontamento encontrado</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <ItemSeparator />} 
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push({ pathname: '/(note)/note', params: { id: item.order.header.id, noteId: item.id } })}>
            <Card 
              item={item.order.header} 
              showSketchBadge={true} 
              sketchText={badgeText(item)}
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
  }
});

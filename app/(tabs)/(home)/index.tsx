import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/components/Themed';
import { getOSFertigationUseCase } from '@/di/Sync';
import { useHomeReducers } from '@/reducers/home';
import { Card } from '@/components/Card';
import { OSFertigation } from '@/domain/entities/OSFertigation';
import { OSFertigationDTO } from '@/domain/types/OSFertigationDTO';
import { useServerData } from '@/hooks/useServerData';

export default function Orders() {
  const {
    fertigationDispatch,
    fertigationState
  } = useHomeReducers()
  
  const setState = (data: OSFertigationDTO[]) => {
    fertigationDispatch({
      type: 'SET',
      payload: data 
    })
  }

  const  { trigger } = useServerData({
    get: () => getOSFertigationUseCase.execute(),
    set: setState,
    validateSchema: OSFertigation
  })

  useEffect(() => {
    trigger()
  }, [])

  return (
    <ViewThemed style={styles.container}>
      <FlatList
        data={fertigationState.osFertigationList}
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

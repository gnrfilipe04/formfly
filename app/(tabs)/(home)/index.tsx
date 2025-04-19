import { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { ItemSeparator, Text, View as ViewThemed } from '@/components/Themed';
import { getOSFertigationUseCase } from '@/di/Sync';
import { useHomeReducers } from '@/reducers/home';
import { Card } from '@/components/Card';
import { OSFertigation } from '@/domain/entities/OSFertigation';
import { z } from 'zod'

export default function Orders() {
  const {
    fertigationDispatch,
    fertigationState
  } = useHomeReducers()

  const getOSHeaders = async () => {
    
    const data = await getOSFertigationUseCase.execute()

    if(!data) return

    const zodValidation = z.array(OSFertigation).safeParse(data)

    if(zodValidation.error){
      return Alert.alert('Tipo de ordem de fertirrigação inválido!', zodValidation.error.errors[0].message)
    }

    fertigationDispatch({
      type: 'SET',
      payload: data 
    })
  }

  useEffect(() => {
    getOSHeaders()
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

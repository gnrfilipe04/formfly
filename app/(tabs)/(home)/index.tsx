import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { getOSHeaderUseCase } from '@/di/Sync';
import { useReducer } from 'react';
import { OSHeaderDTO } from '@/domain/types/OSHeaderDTO';

export default function TabOneScreen() {
  const [headers, dispatch] = useReducer((state: OSHeaderDTO[], action: { type: string; payload?: OSHeaderDTO[] }) => {
    switch (action.type) {
      case 'SET_HEADERS':
        return action.payload || [];
      default:
        return state;
    }
  }, []);

  const getOSHeaders = async () => {
    const data = await getOSHeaderUseCase.execute()
    console.log({ data, })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Button title='Headers' onPress={getOSHeaders}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

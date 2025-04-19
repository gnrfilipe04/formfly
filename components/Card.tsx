import { StyleSheet,  } from 'react-native';
import { Text } from './Themed';
import { OSHeaderDTO } from '@/domain/types/OSHeaderDTO';
import { View } from './Themed'

type CardProps = {
  item: OSHeaderDTO
}

export function Card({ item }: CardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>nº {item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.footer}>
        <Text>Tipo: {item.type}</Text>
        <Text>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});

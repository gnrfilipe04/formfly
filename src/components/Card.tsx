import { StyleSheet,  } from 'react-native';
import { Text } from './Themed';
import { OSHeaderDTO } from '@/src/domain/types/OSHeaderDTO';
import { View } from './Themed'
import { capitalize } from '@/src/utils/helpers';
import { MaterialIcons } from '@expo/vector-icons';

type CardProps = {
  item: OSHeaderDTO
  showSketchBadge?: boolean
}

export function Card({ item, showSketchBadge = false }: CardProps) {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Text style={styles.title}>nº {item.title}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{capitalize(item.type)}</Text>
              </View>
            </View>
            {showSketchBadge && <View style={styles.rightBadge}>
                <Text style={styles.badgeText}>Rascunho</Text>
            </View>}
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.footer}>
            <MaterialIcons name="calendar-month" size={24} color="#666" />
            <Text>{new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={32} color="#666" />
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
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: '#2cab3b',
  },
  rightBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#5c6a73',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

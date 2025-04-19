import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      headerSearchBarOptions: {
        cancelButtonText: 'Cancelar',
        placeholder: 'Pesquisar',
      },
      animation: 'shift',
      popToTopOnBlur: true,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 10,
        height: 100
      }
    }}>
      <Tabs.Screen 
        name="(home)" 
        options={{
          title: 'Ordens',
          tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />
        }} 
      />
      <Tabs.Screen name="(two)" options={{ 
        title: 'Apontamentos', 
        tabBarIcon: ({ color }) => <TabBarIcon name="file-text" color={color} />
      }} />
    </Tabs>
  );
}

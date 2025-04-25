import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const searchBarOptions = {
  cancelButtonText: 'Cancelar',
  placeholder: 'Pesquisar',
}

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      animation: 'shift',
      popToTopOnBlur: true,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 10,
        height: 100
      }
    }}>
      <Tabs.Screen
        name="(orders)/index"
        options={{
          title: 'Ordens',
          headerSearchBarOptions: {
            ...searchBarOptions,
            onChangeText: (e) => console.log(e.nativeEvent.text)
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="th-list" color={color} />
        }}
      />
      <Tabs.Screen
        name="(two)/two"
        options={{
          title: 'Apontamentos',
          headerSearchBarOptions: {
            ...searchBarOptions,
            onChangeText: (e) => console.log(e.nativeEvent.text)
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="file-text" color={color} />
        }} />
    </Tabs>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import MapScreen from '../screens/MapScreen';
import InfoScreen from '../screens/InfoScreen';
import { BottomTabParamList, MapParamList, InfoParamList } from '../types';
import ChainScreen from '../screens/ChainScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="Map">
      <BottomTab.Screen
        name="Map"
        component={MapNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-map" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chains"
        component={ChainNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-link" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={InfoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-bulb" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MapStack = createStackNavigator<MapParamList>();

function MapNavigator() {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{ headerTitle: 'Eat Out to Help Out', headerShown: false }}
      />
    </MapStack.Navigator>
  );
}

const ChainStack = createStackNavigator<InfoParamList>();

function ChainNavigator() {
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="ChainScreen"
        component={ChainScreen}
        options={{ headerTitle: 'Eat Out to Help Out' }}
      />
    </InfoStack.Navigator>
  );
}

const InfoStack = createStackNavigator<InfoParamList>();

function InfoNavigator() {
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{ headerTitle: 'About The Scheme' }}
      />
    </InfoStack.Navigator>
  );
}

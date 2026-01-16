import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import ClientDetailScreen from './screens/ClientDetailScreen';
import AddEditClientScreen from './screens/AddEditClientScreen';
import AddEditActivityScreen from './screens/AddEditActivityScreen';
import ServicesScreen from './screens/ServicesScreen';
import UserManagementScreen from './screens/UserManagementScreen';
import AddEditUserScreen from './screens/AddEditUserScreen';
import ClientListScreen from './screens/ClientListScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Asesor
function AsesorTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = 'home';
          } else if (route.name === 'Clientes') {
            iconName = 'business';
          } else if (route.name === 'Actividades') {
            iconName = 'event';
          } else if (route.name === 'Perfil') {
            iconName = 'person';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={DashboardScreen}
        options={{ title: 'BOPACORPSA CRM' }}
      />
      <Tab.Screen
        name="Clientes"
        component={ClientListScreen}
        options={{ title: 'Mis Clientes' }}
      />
      <Tab.Screen
        name="Actividades"
        component={ActivitiesScreen}
        options={{ title: 'Mis Actividades' }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ title: 'Mi Perfil' }}
      />
    </Tab.Navigator>
  );
}

// Bottom Tab Navigator for Admin
function AdminTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Usuarios') {
            iconName = 'people';
          } else if (route.name === 'Servicios') {
            iconName = 'inventory';
          } else if (route.name === 'Sistema') {
            iconName = 'settings';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#1976d2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{ title: 'Admin - BOPACORPSA' }}
      />
      <Tab.Screen
        name="Usuarios"
        component={UserManagementScreen}
        options={{ title: 'Gestión de Usuarios' }}
      />
      <Tab.Screen
        name="Servicios"
        component={ServicesScreen}
        options={{ title: 'Catálogo de Servicios' }}
      />
      <Tab.Screen
        name="Sistema"
        component={SystemScreen}
        options={{ title: 'Configuración' }}
      />
    </Tab.Navigator>
  );
}

// System screen for admin
function SystemScreen() {
  return <AdminDashboardScreen />;
}

export default function App() {
  const [userRole, setUserRole] = useState(null); // 'asesor' or 'admin'

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="#f5f5f5" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          initialParams={{ setUserRole }}
        />
        <Stack.Screen
          name="MainTabs"
          component={userRole === 'admin' ? AdminTabNavigator : AsesorTabNavigator}
        />
        <Stack.Screen
          name="ClientDetail"
          component={ClientDetailScreen}
          options={{
            headerShown: true,
            title: 'Cliente - BOPACORPSA',
            headerStyle: { backgroundColor: '#1976d2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="AddEditClient"
          component={AddEditClientScreen}
          options={{
            headerShown: true,
            title: 'Cliente - BOPACORPSA',
            headerStyle: { backgroundColor: '#1976d2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="AddEditActivity"
          component={AddEditActivityScreen}
          options={{
            headerShown: true,
            title: 'Actividad - BOPACORPSA',
            headerStyle: { backgroundColor: '#1976d2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="AddEditUser"
          component={AddEditUserScreen}
          options={({ route }) => ({
            headerShown: true,
            title: route.params?.isEdit ? 'Editar Usuario' : 'Nuevo Usuario',
            headerStyle: { backgroundColor: '#1976d2' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

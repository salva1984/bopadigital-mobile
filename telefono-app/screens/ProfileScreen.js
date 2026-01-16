import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const user = {
    name: 'Juan Pérez',
    email: 'juan.perez@bopacorpsa.com',
    role: 'Asesor',
    joinDate: '15/01/2024',
    clientsCount: 45,
    activitiesCount: 128,
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: () => {
          // Aquí iría la lógica de logout
          navigation.replace('Login');
        }},
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidad en desarrollo');
  };

  const handleChangePassword = () => {
    Alert.alert('Cambiar Contraseña', 'Funcionalidad en desarrollo');
  };

  const handleSettings = () => {
    Alert.alert('Configuración', 'Funcionalidad en desarrollo');
  };

  const handleManageTeam = () => {
    // Para asesores, podrían tener permisos limitados para gestionar su equipo
    Alert.alert(
      'Gestionar Equipo',
      'Como asesor, puedes gestionar miembros de tu equipo.',
      [
        { text: 'Agregar Asesor', onPress: () => navigation.navigate('AddEditUser') },
        { text: 'Ver Equipo', onPress: () => Alert.alert('Equipo', 'Funcionalidad en desarrollo') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={60} color="#1976d2" />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user.role}</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="business" size={24} color="#1976d2" />
            <Text style={styles.statNumber}>{user.clientsCount}</Text>
            <Text style={styles.statLabel}>Clientes</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="event" size={24} color="#4caf50" />
            <Text style={styles.statNumber}>{user.activitiesCount}</Text>
            <Text style={styles.statLabel}>Actividades</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="calendar-today" size={24} color="#ff9800" />
            <Text style={styles.statNumber}>{user.joinDate.split('/')[2]}</Text>
            <Text style={styles.statLabel}>Año</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="edit" size={24} color="#1976d2" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Editar Perfil</Text>
              <Text style={styles.menuSubtitle}>Actualizar información personal</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleManageTeam}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="group-add" size={24} color="#4caf50" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Gestionar Equipo</Text>
              <Text style={styles.menuSubtitle}>Agregar nuevos asesores</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="lock" size={24} color="#ff9800" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Cambiar Contraseña</Text>
              <Text style={styles.menuSubtitle}>Actualizar credenciales de acceso</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
            <View style={styles.menuIcon}>
              <MaterialIcons name="settings" size={24} color="#9c27b0" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Configuración</Text>
              <Text style={styles.menuSubtitle}>Preferencias de la aplicación</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <MaterialIcons name="info" size={20} color="#666" />
            <Text style={styles.infoText}>Versión 1.0.0</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="business" size={20} color="#666" />
            <Text style={styles.infoText}>BOPACORPSA CRM</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialIcons name="calendar-today" size={20} color="#666" />
            <Text style={styles.infoText}>Miembro desde {user.joinDate}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color="#f44336" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontFamily: 'System',
  },
  roleBadge: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  roleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'System',
  },
  menuContainer: {
    margin: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'System',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  infoContainer: {
    margin: 16,
    marginTop: 0,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'System',
  },
  logoutContainer: {
    margin: 16,
    marginTop: 0,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffebee',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

export default ProfileScreen;

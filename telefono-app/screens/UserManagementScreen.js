import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const UserManagementScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users] = useState([
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@bopacorpsa.com',
      role: 'Asesor',
      status: 'Activo',
      lastLogin: '15/01/2026 09:30',
      clients: 45,
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@bopacorpsa.com',
      role: 'Asesor',
      status: 'Activo',
      lastLogin: '15/01/2026 08:15',
      clients: 38,
    },
    {
      id: 3,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@bopacorpsa.com',
      role: 'Admin',
      status: 'Activo',
      lastLogin: '15/01/2026 07:45',
      clients: 0,
    },
    {
      id: 4,
      name: 'Ana López',
      email: 'ana.lopez@bopacorpsa.com',
      role: 'Asesor',
      status: 'Inactivo',
      lastLogin: '10/01/2026 16:20',
      clients: 12,
    },
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleColor = (role) => {
    return role === 'Admin' ? '#f08c00' : '#1976d2';
  };

  const getStatusColor = (status) => {
    return status === 'Activo' ? '#4caf50' : '#f44336';
  };

  const handleEditUser = (user) => {
    Alert.alert('Editar Usuario', `¿Desea editar la información de ${user.name}?`);
  };

  const handleDeleteUser = (user) => {
    Alert.alert(
      'Eliminar Usuario',
      `¿Está seguro de eliminar a ${user.name}? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => console.log('User deleted') },
      ]
    );
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Activo' ? 'Inactivo' : 'Activo';
    Alert.alert('Cambiar Estado', `¿Cambiar el estado de ${user.name} a ${newStatus}?`);
  };

  const handleNewUser = () => {
    navigation.navigate('AddEditUser');
  };

  const handleResetPassword = (user) => {
    Alert.alert(
      'Restablecer Contraseña',
      `¿Enviar email de restablecimiento a ${user.email}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', style: 'default', onPress: () => Alert.alert('Éxito', 'Email enviado correctamente') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNewUser}>
          <MaterialIcons name="person-add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>

              <View style={styles.userBadges}>
                <View style={[styles.roleBadge, { backgroundColor: getRoleColor(user.role) }]}>
                  <Text style={styles.roleText}>{user.role}</Text>
                </View>

                <TouchableOpacity
                  style={[styles.statusBadge, { backgroundColor: getStatusColor(user.status) }]}
                  onPress={() => handleToggleStatus(user)}
                >
                  <Text style={styles.statusText}>{user.status}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.userDetails}>
              <View style={styles.detailRow}>
                <MaterialIcons name="schedule" size={16} color="#666" />
                <Text style={styles.detailText}>Último acceso: {user.lastLogin}</Text>
              </View>

              {user.role === 'Asesor' && (
                <View style={styles.detailRow}>
                  <MaterialIcons name="business" size={16} color="#666" />
                  <Text style={styles.detailText}>Clientes activos: {user.clients}</Text>
                </View>
              )}
            </View>

            <View style={styles.userActions}>
              <TouchableOpacity
                style={[styles.actionButton, styles.editButton]}
                onPress={() => handleEditUser(user)}
              >
                <MaterialIcons name="edit" size={18} color="#1976d2" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.resetButton]}
                onPress={() => handleResetPassword(user)}
              >
                <MaterialIcons name="lock-reset" size={18} color="#ff9800" />
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDeleteUser(user)}
              >
                <MaterialIcons name="delete" size={18} color="#f44336" />
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {filteredUsers.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="people" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No se encontraron usuarios</Text>
          </View>
        )}

        {/* User Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{users.filter(u => u.status === 'Activo').length}</Text>
              <Text style={styles.statLabel}>Usuarios Activos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{users.filter(u => u.role === 'Asesor').length}</Text>
              <Text style={styles.statLabel}>Asesores</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{users.filter(u => u.role === 'Admin').length}</Text>
              <Text style={styles.statLabel}>Administradores</Text>
            </View>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
  addButton: {
    backgroundColor: '#1976d2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'System',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'System',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  userBadges: {
    alignItems: 'flex-end',
    gap: 8,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roleText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'System',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'System',
  },
  userDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'System',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginHorizontal: 2,
    borderRadius: 6,
  },
  editButton: {
    backgroundColor: '#e3f2fd',
  },
  editButtonText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
  resetButton: {
    backgroundColor: '#fff3e0',
  },
  resetButtonText: {
    color: '#ff9800',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
  deleteButton: {
    backgroundColor: '#ffebee',
  },
  deleteButtonText: {
    color: '#f44336',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontFamily: 'System',
  },
  statsSection: {
    marginTop: 20,
    marginBottom: 40,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
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
    color: '#1976d2',
    marginBottom: 4,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default UserManagementScreen;

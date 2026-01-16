import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ClientCard from '../components/ClientCard';

const ClientListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const clients = [
    {
      id: 1,
      companyName: "Logística Costera (LogiCost)",
      contactName: "Juan Vélez",
      email: "jcvelez@logicost.ec",
      status: "Cliente lucrativo",
      phone: "+593 98 123 4567",
      address: "Av. Principal 123, Guayaquil"
    },
    {
      id: 2,
      companyName: "Andres Carros Inc.",
      contactName: "Adalina Medina",
      email: "portabilidadCAI@gmail.com",
      status: "Cliente lucrativo",
      phone: "+593 99 234 5678",
      address: "Calle Secundaria 456, Quito"
    },
    {
      id: 3,
      companyName: "Sapitos Corp.",
      contactName: "José B.",
      email: "jose@sapitoscorp.com",
      status: "Cliente lucrativo",
      phone: "+593 97 345 6789",
      address: "Plaza Central 789, Cuenca"
    },
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleClientPress = (client) => {
    navigation.navigate('ClientDetail', { client });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Clientes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditClient')}
        >
          <MaterialIcons name="person-add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar clientes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('AddEditUser')}
        >
          <MaterialIcons name="group-add" size={20} color="#4caf50" />
          <Text style={styles.secondaryButtonText}>Nuevo Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterStatus === 'all' && styles.activeFilter]}
          onPress={() => setFilterStatus('all')}
        >
          <Text style={[styles.filterText, filterStatus === 'all' && styles.activeFilterText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterStatus === 'Cliente lucrativo' && styles.activeFilter]}
          onPress={() => setFilterStatus('Cliente lucrativo')}
        >
          <Text style={[styles.filterText, filterStatus === 'Cliente lucrativo' && styles.activeFilterText]}>Activos</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredClients.map((client) => (
          <TouchableOpacity key={client.id} onPress={() => handleClientPress(client)}>
            <ClientCard
              companyName={client.companyName}
              contactName={client.contactName}
              email={client.email}
              status={client.status}
            />
          </TouchableOpacity>
        ))}

        {filteredClients.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No se encontraron clientes</Text>
          </View>
        )}
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
  actionBar: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
    alignSelf: 'flex-start',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'System',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  activeFilterText: {
    color: '#fff',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
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
});

export default ClientListScreen;

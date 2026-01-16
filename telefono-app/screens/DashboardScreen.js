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
import ActivityCard from '../components/ActivityCard';
import BusinessPlanCard from '../components/BusinessPlanCard';

const DashboardScreen = ({ navigation }) => {
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
    {
      id: 4,
      companyName: "Grupo Andino Z",
      contactName: "Roberto Alvarez",
      email: "r.alvarez@grupo-z.com.ec",
      status: "Cliente lucrativo",
      phone: "+593 96 456 7890",
      address: "Zona Industrial 321, Ambato"
    },
    {
      id: 5,
      companyName: "Innovatec Global S.A.",
      contactName: "María Silva",
      email: "mfsilva@innovatec.ec",
      status: "Cliente lucrativo",
      phone: "+593 95 567 8901",
      address: "Parque Empresarial 654, Manta"
    },
    {
      id: 6,
      companyName: "Empresa X. SA",
      contactName: "Francisco Pérez",
      email: "Franpe@xindustry.ec",
      status: "Cliente lucrativo",
      phone: "+593 94 678 9012",
      address: "Boulevard Empresarial 987, Loja"
    }
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
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Hola, Asesor1</Text>
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar clientes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

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
        </View>

        {/* Upcoming Activities Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actividad próxima</Text>
          <Text style={styles.sectionSubtitle}>4 días para cierre</Text>

          <ActivityCard
            title="Visita Cotización"
            company="Empresa X. SA"
            status="Requiere aprobación"
            date="12-10-25"
            time="12:30pm"
            type="upcoming"
          />

          <ActivityCard
            title="Subida de documentación"
            company="Sapitos Corp."
            status="Cerrado"
            date="14-10-25"
            time="6:00pm"
            type="upcoming"
          />
        </View>

        {/* Business Plan Section */}
        <View style={styles.section}>
          <BusinessPlanCard />
        </View>

        {/* Recent Activities Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actividad reciente</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddEditActivity')}
            >
              <MaterialIcons name="event-add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Nueva</Text>
            </TouchableOpacity>
          </View>

          <ActivityCard
            title="Visita Técnica"
            company="Empresa X. SA"
            status="Completado"
            date="10-10-25"
            time="2:00pm"
            type="recent"
          />

          <ActivityCard
            title="Subida de documentación"
            company="Sapitos Corp."
            status="Cerrado"
            date="09-10-25"
            time="4:00pm"
            type="recent"
          />
        </View>

        {/* Clients Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clientes ({filteredClients.length})</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddEditClient')}
            >
              <MaterialIcons name="person-add" size={20} color="#fff" />
              <Text style={styles.addButtonText}>Nuevo</Text>
            </TouchableOpacity>
          </View>

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
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            Alert.alert(
              'Acciones Rápidas',
              'Selecciona una acción',
              [
                { text: 'Nuevo Cliente', onPress: () => navigation.navigate('AddEditClient') },
                { text: 'Nueva Actividad', onPress: () => navigation.navigate('AddEditActivity') },
                { text: 'Servicios', onPress: () => navigation.navigate('Services') },
                { text: 'Cancelar', style: 'cancel' },
              ]
            );
          }}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
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
    padding: 16,
  },
  greetingSection: {
    marginBottom: 24,
    paddingTop: 16,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
  searchSection: {
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1976d2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1976d2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System',
  },
  sectionSubtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
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
});

export default DashboardScreen;

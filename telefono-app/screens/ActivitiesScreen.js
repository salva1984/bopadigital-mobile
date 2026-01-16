import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ActivityCard from '../components/ActivityCard';

const ActivitiesScreen = ({ navigation }) => {
  const [filterType, setFilterType] = useState('all');

  const activities = [
    {
      id: 1,
      title: "Visita Cotización",
      company: "Empresa X. SA",
      status: "Requiere aprobación",
      date: "12-10-25",
      time: "12:30pm",
      type: "upcoming"
    },
    {
      id: 2,
      title: "Subida de documentación",
      company: "Sapitos Corp.",
      status: "Cerrado",
      date: "14-10-25",
      time: "6:00pm",
      type: "upcoming"
    },
    {
      id: 3,
      title: "Visita Técnica",
      company: "Empresa X. SA",
      status: "Completado",
      date: "10-10-25",
      time: "2:00pm",
      type: "recent"
    },
    {
      id: 4,
      title: "Llamada de Seguimiento",
      company: "Logística Costera",
      status: "Pendiente",
      date: "08-10-25",
      time: "10:15am",
      type: "recent"
    },
  ];

  const filteredActivities = activities.filter(activity => {
    if (filterType === 'all') return true;
    return activity.type === filterType;
  });

  const upcomingCount = activities.filter(a => a.type === 'upcoming').length;
  const recentCount = activities.filter(a => a.type === 'recent').length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Actividades</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddEditActivity')}
        >
          <MaterialIcons name="event-add" size={24} color="#fff" />
        </TouchableOpacity>
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
          style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
          onPress={() => setFilterType('all')}
        >
          <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>
            Todas ({activities.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'upcoming' && styles.activeFilter]}
          onPress={() => setFilterType('upcoming')}
        >
          <Text style={[styles.filterText, filterType === 'upcoming' && styles.activeFilterText]}>
            Próximas ({upcomingCount})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'recent' && styles.activeFilter]}
          onPress={() => setFilterType('recent')}
        >
          <Text style={[styles.filterText, filterType === 'recent' && styles.activeFilterText]}>
            Recientes ({recentCount})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            title={activity.title}
            company={activity.company}
            status={activity.status}
            date={activity.date}
            time={activity.time}
            type={activity.type}
          />
        ))}

        {filteredActivities.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-busy" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>
              {filterType === 'upcoming' ? 'No hay actividades próximas' :
               filterType === 'recent' ? 'No hay actividades recientes' :
               'No hay actividades'}
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate('AddEditActivity')}
            >
              <Text style={styles.emptyStateButtonText}>Crear Primera Actividad</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  filterText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'System',
    textAlign: 'center',
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
    textAlign: 'center',
    fontFamily: 'System',
  },
  emptyStateButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default ActivitiesScreen;

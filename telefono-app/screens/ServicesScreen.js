import React, { useState } from 'react';
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

const ServicesScreen = ({ navigation }) => {
  const [services] = useState([
    {
      id: 1,
      name: 'Consultoría Empresarial',
      description: 'Asesoría estratégica para optimización de procesos',
      price: '150.00',
      duration: '4 horas',
      category: 'Consultoría',
      status: 'Activo',
    },
    {
      id: 2,
      name: 'Desarrollo de Software',
      description: 'Creación de soluciones tecnológicas a medida',
      price: '2500.00',
      duration: 'Por proyecto',
      category: 'Tecnología',
      status: 'Activo',
    },
    {
      id: 3,
      name: 'Auditoría de Sistemas',
      description: 'Revisión completa de sistemas y procesos',
      price: '800.00',
      duration: '2 días',
      category: 'Auditoría',
      status: 'Activo',
    },
    {
      id: 4,
      name: 'Capacitación Empresarial',
      description: 'Talleres y cursos para equipos de trabajo',
      price: '300.00',
      duration: '8 horas',
      category: 'Capacitación',
      status: 'Inactivo',
    },
  ]);

  const getStatusColor = (status) => {
    return status === 'Activo' ? '#4caf50' : '#f44336';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Consultoría': '#2196f3',
      'Tecnología': '#9c27b0',
      'Auditoría': '#ff9800',
      'Capacitación': '#4caf50',
    };
    return colors[category] || '#666';
  };

  const handleEditService = (service) => {
    Alert.alert('Editar Servicio', `¿Desea editar "${service.name}"?`);
  };

  const handleDeleteService = (service) => {
    Alert.alert(
      'Eliminar Servicio',
      `¿Está seguro de eliminar "${service.name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Deleted') },
      ]
    );
  };

  const handleNewService = () => {
    Alert.alert('Nuevo Servicio', 'Funcionalidad en desarrollo');
  };

  const handleToggleStatus = (service) => {
    const newStatus = service.status === 'Activo' ? 'Inactivo' : 'Activo';
    Alert.alert('Cambiar Estado', `¿Cambiar estado a ${newStatus}?`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Servicios</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleNewService}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.categoryBadge}>
                  <Text style={[styles.categoryText, { color: getCategoryColor(service.category) }]}>
                    {service.category}
                  </Text>
                </View>
              </View>

              <View style={styles.serviceActions}>
                <TouchableOpacity
                  style={[styles.statusBadge, { backgroundColor: getStatusColor(service.status) }]}
                  onPress={() => handleToggleStatus(service)}
                >
                  <Text style={styles.statusText}>{service.status}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleEditService(service)}
                >
                  <MaterialIcons name="edit" size={20} color="#1976d2" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleDeleteService(service)}
                >
                  <MaterialIcons name="delete" size={20} color="#f44336" />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.serviceDescription}>{service.description}</Text>

            <View style={styles.serviceDetails}>
              <View style={styles.detailItem}>
                <MaterialIcons name="attach-money" size={16} color="#4caf50" />
                <Text style={styles.detailText}>${service.price}</Text>
              </View>

              <View style={styles.detailItem}>
                <MaterialIcons name="schedule" size={16} color="#ff9800" />
                <Text style={styles.detailText}>{service.duration}</Text>
              </View>
            </View>
          </View>
        ))}

        {services.length === 0 && (
          <View style={styles.emptyState}>
            <MaterialIcons name="inventory" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No hay servicios registrados</Text>
            <TouchableOpacity style={styles.emptyStateButton} onPress={handleNewService}>
              <Text style={styles.emptyStateButtonText}>Crear Primer Servicio</Text>
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
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  serviceCard: {
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
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'System',
  },
  serviceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  actionButton: {
    padding: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
    fontFamily: 'System',
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
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
    marginBottom: 16,
    fontFamily: 'System',
  },
  emptyStateButton: {
    backgroundColor: '#1976d2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default ServicesScreen;

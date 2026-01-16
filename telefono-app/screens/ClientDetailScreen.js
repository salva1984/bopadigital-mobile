import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ClientDetailScreen = ({ route, navigation }) => {
  const { client } = route.params;

  const handleCall = () => {
    Linking.openURL(`tel:${client.phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${client.email}`);
  };

  const handleEdit = () => {
    Alert.alert('Editar Cliente', 'Funcionalidad de edición en desarrollo');
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar Cliente',
      `¿Está seguro de que desea eliminar ${client.companyName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const handleNewActivity = () => {
    Alert.alert('Nueva Actividad', 'Funcionalidad en desarrollo');
  };

  const clientActivities = [
    {
      id: 1,
      type: 'Visita Cotización',
      date: '12-10-25',
      time: '12:30pm',
      status: 'Requiere aprobación',
      description: 'Presentación de servicios de logística especializada'
    },
    {
      id: 2,
      type: 'Llamada de Seguimiento',
      date: '08-10-25',
      time: '10:15am',
      status: 'Completado',
      description: 'Seguimiento de propuesta enviada'
    },
    {
      id: 3,
      type: 'Envío de Propuesta',
      date: '05-10-25',
      time: '3:45pm',
      status: 'Completado',
      description: 'Propuesta comercial enviada por email'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'requiere aprobación':
        return '#ff9800';
      case 'completado':
        return '#4caf50';
      case 'cerrado':
        return '#2196f3';
      default:
        return '#666';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyIcon}>
            <MaterialIcons name="business" size={40} color="#f08c00" />
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.companyName}>{client.companyName}</Text>
            <Text style={styles.status}>{client.status}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, styles.callButton]} onPress={handleCall}>
            <MaterialIcons name="phone" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Llamar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.emailButton]} onPress={handleEmail}>
            <MaterialIcons name="email" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, styles.editButton]} onPress={handleEdit}>
            <MaterialIcons name="edit" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Editar</Text>
          </TouchableOpacity>
        </View>

        {/* Client Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Cliente</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Nombre de Contacto</Text>
                <Text style={styles.infoValue}>{client.contactName}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="email" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Correo Electrónico</Text>
                <Text style={styles.infoValue}>{client.email}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="phone" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <Text style={styles.infoValue}>{client.phone}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Dirección</Text>
                <Text style={styles.infoValue}>{client.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Business Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Plan de Negocio</Text>
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <View style={styles.planIcon}>
                <MaterialIcons name="business" size={24} color="#f08c00" />
              </View>
              <View style={styles.planInfo}>
                <Text style={styles.planName}>Bussiness Gold Plan Mov</Text>
                <Text style={styles.planFeature}>Voz & Conectividad</Text>
              </View>
            </View>
            <View style={styles.planPrice}>
              <Text style={styles.price}>14.99 + Iva c/línea</Text>
              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>Plan Activo</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activities */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Actividades Recientes</Text>
            <TouchableOpacity
              style={styles.newActivityButton}
              onPress={() => navigation.navigate('AddEditActivity', { clientId: client.id })}
            >
              <MaterialIcons name="add" size={20} color="#1976d2" />
              <Text style={styles.newActivityText}>Nueva</Text>
            </TouchableOpacity>
          </View>

          {clientActivities.map((activity) => (
            <View key={activity.id} style={styles.activityCard}>
              <View style={styles.activityHeader}>
                <Text style={styles.activityType}>{activity.type}</Text>
                <View style={[styles.activityStatus, { backgroundColor: getStatusColor(activity.status) }]}>
                  <Text style={styles.activityStatusText}>{activity.status}</Text>
                </View>
              </View>
              <Text style={styles.activityDescription}>{activity.description}</Text>
              <View style={styles.activityDateTime}>
                <Text style={styles.activityDate}>{activity.date}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Zona de Peligro</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <MaterialIcons name="delete-forever" size={20} color="#fff" />
            <Text style={styles.deleteButtonText}>Eliminar Cliente</Text>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  status: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: '500',
    fontFamily: 'System',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  callButton: {
    backgroundColor: '#4caf50',
  },
  emailButton: {
    backgroundColor: '#2196f3',
  },
  editButton: {
    backgroundColor: '#1976d2',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'System',
  },
  newActivityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  newActivityText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'System',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'System',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  planIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'System',
  },
  planFeature: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
    fontFamily: 'System',
  },
  planPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
  activeBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'System',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  activityType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    fontFamily: 'System',
  },
  activityStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activityStatusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'System',
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'System',
  },
  activityDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityDate: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'System',
  },
  activityTime: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
});

export default ClientDetailScreen;

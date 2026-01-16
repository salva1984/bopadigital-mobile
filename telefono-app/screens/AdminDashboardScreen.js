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

const AdminDashboardScreen = ({ navigation }) => {
  const [stats] = useState({
    totalClients: 156,
    activeProjects: 23,
    monthlyRevenue: 125000,
    pendingTasks: 12,
  });

  const adminActions = [
    {
      id: 1,
      title: 'Gestión de Usuarios',
      subtitle: 'Administrar asesores y permisos',
      icon: 'people',
      color: '#2196f3',
      action: () => navigation.navigate('UserManagement'),
    },
    {
      id: 2,
      title: 'Reportes y Analytics',
      subtitle: 'Ver estadísticas y reportes',
      icon: 'analytics',
      color: '#4caf50',
      action: () => Alert.alert('Reportes', 'Funcionalidad en desarrollo'),
    },
    {
      id: 3,
      title: 'Gestión de Servicios',
      subtitle: 'Administrar catálogo de servicios',
      icon: 'inventory',
      color: '#ff9800',
      action: () => navigation.navigate('Services'),
    },
    {
      id: 4,
      title: 'Base de Datos',
      subtitle: 'Gestión de datos y backups',
      icon: 'storage',
      color: '#9c27b0',
      action: () => Alert.alert('Base de Datos', 'Funcionalidad en desarrollo'),
    },
  ];

  const quickStats = [
    { label: 'Clientes Totales', value: stats.totalClients, icon: 'business', color: '#2196f3' },
    { label: 'Proyectos Activos', value: stats.activeProjects, icon: 'work', color: '#4caf50' },
    { label: 'Ingresos Mensuales', value: `$${stats.monthlyRevenue.toLocaleString()}`, icon: 'attach-money', color: '#ff9800' },
    { label: 'Tareas Pendientes', value: stats.pendingTasks, icon: 'schedule', color: '#f44336' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingText}>Hola, Admin</Text>
          <Text style={styles.greetingSubtitle}>BOPACORPSA - Administración</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Estadísticas Rápidas</Text>
          <View style={styles.statsGrid}>
            {quickStats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
                  <MaterialIcons name={stat.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Admin Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Acciones Administrativas</Text>
          {adminActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={action.action}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <MaterialIcons name={action.icon} size={24} color="#fff" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* System Status */}
        <View style={styles.statusSection}>
          <Text style={styles.sectionTitle}>Estado del Sistema</Text>

          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <MaterialIcons name="check-circle" size={20} color="#4caf50" />
              <Text style={styles.statusTitle}>Sistema Operativo</Text>
            </View>
            <Text style={styles.statusText}>Todos los servicios funcionando correctamente</Text>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <MaterialIcons name="warning" size={20} color="#ff9800" />
              <Text style={styles.statusTitle}>Última Copia de Seguridad</Text>
            </View>
            <Text style={styles.statusText}>Hace 2 horas - 15/01/2026 10:30 AM</Text>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <MaterialIcons name="info" size={20} color="#2196f3" />
              <Text style={styles.statusTitle}>Versión del Sistema</Text>
            </View>
            <Text style={styles.statusText}>v2.1.4 - Última actualización: 12/01/2026</Text>
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.quickAccessSection}>
          <Text style={styles.sectionTitle}>Acceso Rápido</Text>
          <View style={styles.quickAccessGrid}>
            <TouchableOpacity
              style={styles.quickAccessButton}
              onPress={() => {
                // This would require a more complex navigation setup
                // For now, just show an alert
                Alert.alert('Vista Asesor', 'Funcionalidad en desarrollo');
              }}
            >
              <MaterialIcons name="dashboard" size={24} color="#f08c00" />
              <Text style={styles.quickAccessText}>Vista Asesor</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <MaterialIcons name="notifications" size={24} color="#4caf50" />
              <Text style={styles.quickAccessText}>Notificaciones</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <MaterialIcons name="support" size={24} color="#2196f3" />
              <Text style={styles.quickAccessText}>Soporte</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAccessButton}>
              <MaterialIcons name="logout" size={24} color="#f44336" />
              <Text style={styles.quickAccessText}>Cerrar Sesión</Text>
            </TouchableOpacity>
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
  greetingSubtitle: {
    fontSize: 18,
    color: '#f08c00',
    marginTop: 4,
    fontFamily: 'System',
  },
  statsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    fontFamily: 'System',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'System',
  },
  actionsSection: {
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'System',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  statusSection: {
    marginBottom: 32,
  },
  statusCard: {
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
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    fontFamily: 'System',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  quickAccessSection: {
    marginBottom: 32,
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickAccessButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '45%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickAccessText: {
    fontSize: 12,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'System',
  },
});

export default AdminDashboardScreen;

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ActivityCard = ({ title, company, status, date, time, type }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'requiere aprobación':
        return '#ff9800';
      case 'cerrado':
        return '#4caf50';
      case 'completado':
        return '#2196f3';
      default:
        return '#666';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'requiere aprobación':
        return 'schedule';
      case 'cerrado':
        return 'check-circle';
      case 'completado':
        return 'done';
      default:
        return 'event';
    }
  };

  return (
    <View style={[styles.card, type === 'upcoming' && styles.upcomingCard]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
          <MaterialIcons name={getStatusIcon(status)} size={14} color="#fff" />
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.companySection}>
        <Text style={styles.companyName}>{company}</Text>
      </View>

      <View style={styles.dateTimeSection}>
        <Text style={styles.dateTime}>
          {date}
        </Text>
        <Text style={styles.dateTime}>
          {time}
        </Text>
      </View>

      {type === 'upcoming' && (
        <View style={styles.upcomingIndicator}>
          <MaterialIcons name="schedule" size={16} color="#1976d2" />
          <Text style={styles.upcomingText}>Próxima actividad</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  upcomingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    fontFamily: 'System',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
  companySection: {
    marginBottom: 8,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
  },
  dateTimeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: 'System',
  },
  upcomingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  upcomingText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500',
    marginLeft: 4,
    fontFamily: 'System',
  },
});

export default ActivityCard;

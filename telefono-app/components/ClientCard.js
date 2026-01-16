import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ClientCard = ({ companyName, contactName, email, status }) => {
  const handleEdit = () => {
    Alert.alert('Editar', `¿Desea editar la información de ${companyName}?`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Eliminar',
      `¿Está seguro de que desea eliminar ${companyName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => console.log('Deleted') },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={handleEdit}>
            <MaterialIcons name="edit" size={20} color="#f08c00" />
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialIcons name="delete" size={20} color="#ff4444" />
            <Text style={[styles.buttonText, styles.deleteText]}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactLabel}>Nombre de Contacto:</Text>
        <Text style={styles.contactValue}>{contactName}</Text>

        <Text style={styles.contactLabel}>Correo:</Text>
        <Text style={styles.contactValue}>{email}</Text>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  status: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1976d2',
    marginLeft: 4,
    fontFamily: 'System',
  },
  deleteText: {
    color: '#ff4444',
  },
  contactInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  contactLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
    fontFamily: 'System',
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System',
  },
});

export default ClientCard;

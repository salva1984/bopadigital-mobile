import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  Platform,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AddEditClientScreen = ({ route, navigation }) => {
  const { client, isEdit } = route.params || {};
  const [formData, setFormData] = useState({
    companyName: client?.companyName || '',
    contactName: client?.contactName || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    status: client?.status || 'Cliente lucrativo',
    photo: client?.photo || null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName.trim()) newErrors.companyName = true;
    if (!formData.contactName.trim()) newErrors.contactName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.phone.trim()) newErrors.phone = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería para seleccionar fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleInputChange('photo', result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Necesitamos acceso a la cámara para tomar fotos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      handleInputChange('photo', result.assets[0].uri);
    }
  };

  const showPhotoOptions = () => {
    Alert.alert(
      'Agregar Foto',
      'Selecciona una opción',
      [
        { text: 'Tomar Foto', onPress: takePhoto },
        { text: 'Seleccionar de Galería', onPress: pickImage },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    // Aquí iría la lógica para guardar en la base de datos
    Alert.alert(
      'Éxito',
      `Cliente ${isEdit ? 'actualizado' : 'creado'} correctamente.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}
          </Text>
          <Text style={styles.subtitle}>
            {isEdit ? 'Modifica la información del cliente' : 'Ingresa la información del nuevo cliente'}
          </Text>
        </View>

        {/* Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer} onPress={showPhotoOptions}>
            {formData.photo ? (
              <Image source={{ uri: formData.photo }} style={styles.photo} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <MaterialIcons name="person" size={60} color="#ccc" />
                <Text style={styles.photoText}>Agregar Foto</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={showPhotoOptions}>
            <MaterialIcons name="camera-alt" size={20} color="#1976d2" />
            <Text style={styles.photoButtonText}>Cambiar Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de Empresa *</Text>
            <TextInput
              style={[styles.input, errors.companyName && styles.inputError]}
              value={formData.companyName}
              onChangeText={(value) => handleInputChange('companyName', value)}
              placeholder="Ej: Empresa XYZ S.A."
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de Contacto *</Text>
            <TextInput
              style={[styles.input, errors.contactName && styles.inputError]}
              value={formData.contactName}
              onChangeText={(value) => handleInputChange('contactName', value)}
              placeholder="Ej: Juan Pérez"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="cliente@empresa.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="+593 98 123 4567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dirección</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={formData.address}
              onChangeText={(value) => handleInputChange('address', value)}
              placeholder="Dirección completa de la empresa"
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.statusContainer}>
              {['Cliente lucrativo', 'Prospecto', 'Inactivo'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusOption,
                    formData.status === status && styles.statusSelected
                  ]}
                  onPress={() => handleInputChange('status', status)}
                >
                  <Text style={[
                    styles.statusText,
                    formData.status === status && styles.statusTextSelected
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Guardar Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="cancel" size={20} color="#666" />
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'System',
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
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
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontFamily: 'System',
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  photoButtonText: {
    color: '#1976d2',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: 'System',
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'System',
  },
  inputError: {
    borderColor: '#f44336',
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  statusOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  statusSelected: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  statusTextSelected: {
    color: '#fff',
  },
  actionsSection: {
    marginBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#4caf50',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'System',
  },
});

export default AddEditClientScreen;

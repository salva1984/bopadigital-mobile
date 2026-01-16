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
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddEditUserScreen = ({ route, navigation }) => {
  const { user, isEdit } = route.params || {};
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Asesor',
    password: '',
    confirmPassword: '',
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
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!isEdit && !formData.password.trim()) newErrors.password = true;
    if (!isEdit && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    // Aquí iría la lógica para guardar en la base de datos
    Alert.alert(
      'Éxito',
      `Usuario ${isEdit ? 'actualizado' : 'creado'} correctamente.`,
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
            {isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
          </Text>
          <Text style={styles.subtitle}>
            {isEdit ? 'Modifica la información del usuario' : 'Crea una nueva cuenta de usuario'}
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre Completo *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Ej: Juan Pérez"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo Electrónico *</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="usuario@bopacorpsa.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rol</Text>
            <View style={styles.optionsContainer}>
              {['Asesor', 'Admin'].map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.option,
                    formData.role === role && styles.optionSelected
                  ]}
                  onPress={() => handleInputChange('role', role)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.role === role && styles.optionTextSelected
                  ]}>
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {!isEdit && (
            <>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña *</Text>
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  value={formData.password}
                  onChangeText={(value) => handleInputChange('password', value)}
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Contraseña *</Text>
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  value={formData.confirmPassword}
                  onChangeText={(value) => handleInputChange('confirmPassword', value)}
                  placeholder="Repite la contraseña"
                  secureTextEntry
                />
              </View>
            </>
          )}

          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color="#1976d2" />
            <Text style={styles.infoText}>
              {isEdit
                ? 'Los cambios se aplicarán inmediatamente al guardar.'
                : 'El usuario podrá acceder al sistema con su email y contraseña.'
              }
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSave}
          >
            <MaterialIcons name="save" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>
              {isEdit ? 'Actualizar Usuario' : 'Crear Usuario'}
            </Text>
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
  optionsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  optionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'System',
  },
  optionTextSelected: {
    color: '#fff',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#1976d2',
    flex: 1,
    lineHeight: 20,
    fontFamily: 'System',
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

export default AddEditUserScreen;

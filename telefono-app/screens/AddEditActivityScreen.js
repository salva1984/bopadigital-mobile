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
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AddEditActivityScreen = ({ route, navigation }) => {
  const { activity, clientId, isEdit } = route.params || {};
  const [formData, setFormData] = useState({
    title: activity?.title || '',
    type: activity?.type || 'Visita Cotización',
    description: activity?.description || '',
    date: activity?.date || '',
    time: activity?.time || '',
    status: activity?.status || 'Requiere aprobación',
    priority: activity?.priority || 'Media',
    notes: activity?.notes || '',
  });

  const [errors, setErrors] = useState({});

  const activityTypes = [
    'Visita Cotización',
    'Visita Técnica',
    'Llamada de Seguimiento',
    'Envío de Propuesta',
    'Subida de documentación',
    'Reunión',
    'Otro'
  ];

  const priorities = ['Baja', 'Media', 'Alta', 'Urgente'];
  const statuses = ['Requiere aprobación', 'Pendiente', 'En progreso', 'Completado', 'Cancelado'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.type.trim()) newErrors.type = true;
    if (!formData.date.trim()) newErrors.date = true;
    if (!formData.time.trim()) newErrors.time = true;

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
      `Actividad ${isEdit ? 'actualizada' : 'creada'} correctamente.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const formatDate = (dateString) => {
    // Simple date formatting - in a real app you'd use a date picker
    return dateString;
  };

  const formatTime = (timeString) => {
    // Simple time formatting - in a real app you'd use a time picker
    return timeString;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isEdit ? 'Editar Actividad' : 'Nueva Actividad'}
          </Text>
          <Text style={styles.subtitle}>
            {isEdit ? 'Modifica los detalles de la actividad' : 'Crea una nueva actividad para el cliente'}
          </Text>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título de la Actividad *</Text>
            <TextInput
              style={[styles.input, errors.title && styles.inputError]}
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
              placeholder="Ej: Presentación de servicios"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tipo de Actividad *</Text>
            <View style={styles.optionsContainer}>
              {activityTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.option,
                    formData.type === type && styles.optionSelected
                  ]}
                  onPress={() => handleInputChange('type', type)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.type === type && styles.optionTextSelected
                  ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Fecha *</Text>
              <TextInput
                style={[styles.input, errors.date && styles.inputError]}
                value={formData.date}
                onChangeText={(value) => handleInputChange('date', value)}
                placeholder="DD-MM-YY"
              />
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Hora *</Text>
              <TextInput
                style={[styles.input, errors.time && styles.inputError]}
                value={formData.time}
                onChangeText={(value) => handleInputChange('time', value)}
                placeholder="HH:MM"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Estado</Text>
            <View style={styles.optionsContainer}>
              {statuses.map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.option,
                    formData.status === status && styles.optionSelected
                  ]}
                  onPress={() => handleInputChange('status', status)}
                >
                  <Text style={[
                    styles.optionText,
                    formData.status === status && styles.optionTextSelected
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityOption,
                    formData.priority === priority && styles[`priority${priority}`]
                  ]}
                  onPress={() => handleInputChange('priority', priority)}
                >
                  <Text style={[
                    styles.priorityText,
                    formData.priority === priority && styles.priorityTextSelected
                  ]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descripción</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              placeholder="Describe los detalles de la actividad..."
              multiline
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notas Adicionales</Text>
            <TextInput
              style={[styles.input, { height: 100 }]}
              value={formData.notes}
              onChangeText={(value) => handleInputChange('notes', value)}
              placeholder="Notas internas, recordatorios, etc..."
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickAction}>
              <MaterialIcons name="event" size={24} color="#1976d2" />
              <Text style={styles.quickActionText}>Agendar Recordatorio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <MaterialIcons name="share" size={24} color="#4caf50" />
              <Text style={styles.quickActionText}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickAction}>
              <MaterialIcons name="attach-file" size={24} color="#ff9800" />
              <Text style={styles.quickActionText}>Adjuntar Archivo</Text>
            </TouchableOpacity>
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
              {isEdit ? 'Actualizar Actividad' : 'Crear Actividad'}
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
  rowContainer: {
    flexDirection: 'row',
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
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  optionSelected: {
    backgroundColor: '#1976d2',
    borderColor: '#1976d2',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'System',
  },
  optionTextSelected: {
    color: '#fff',
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  priorityBaja: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  priorityMedia: {
    backgroundColor: '#ff9800',
    borderColor: '#ff9800',
  },
  priorityAlta: {
    backgroundColor: '#f44336',
    borderColor: '#f44336',
  },
  priorityUrgente: {
    backgroundColor: '#9c27b0',
    borderColor: '#9c27b0',
  },
  priorityText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    fontFamily: 'System',
  },
  priorityTextSelected: {
    color: '#fff',
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    fontFamily: 'System',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickAction: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
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

export default AddEditActivityScreen;

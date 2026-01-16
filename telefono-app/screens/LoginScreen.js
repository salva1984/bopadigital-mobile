import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation, route }) => {
  const { setUserRole } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (role) => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    // Simple authentication logic
    if (role === 'asesor' && email.includes('asesor')) {
      setUserRole('asesor');
      navigation.replace('MainTabs');
    } else if (role === 'admin' && email.includes('admin')) {
      setUserRole('admin');
      navigation.replace('MainTabs');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas para el rol seleccionado');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <MaterialIcons name="business" size={80} color="#1976d2" />
          <Text style={styles.title}>BOPACORPSA</Text>
          <Text style={styles.subtitle}>CRM Empresarial</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="usuario@empresa.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry
          />

          <View style={styles.roleButtons}>
            <TouchableOpacity
              style={[styles.roleButton, styles.asesorButton]}
              onPress={() => handleLogin('asesor')}
            >
              <MaterialIcons name="person" size={24} color="#fff" />
              <Text style={styles.roleButtonText}>Ingresar como Asesor</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleButton, styles.adminButton]}
              onPress={() => handleLogin('admin')}
            >
              <MaterialIcons name="admin-panel-settings" size={24} color="#fff" />
              <Text style={styles.roleButtonText}>Ingresar como Admin</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Credenciales de Prueba:</Text>
          <Text style={styles.demoText}>Asesor: asesor@logicost.ec / 123456</Text>
          <Text style={styles.demoText}>Admin: admin@logicost.ec / 123456</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    color: '#f08c00',
    marginTop: 5,
    fontFamily: 'System',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
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
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    fontFamily: 'System',
  },
  roleButtons: {
    gap: 12,
  },
  roleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 10,
  },
  asesorButton: {
    backgroundColor: '#2196f3',
  },
  adminButton: {
    backgroundColor: '#f08c00',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'System',
  },
  demoContainer: {
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
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    fontFamily: 'System',
  },
  demoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'System',
  },
});

export default LoginScreen;

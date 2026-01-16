import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BusinessPlanCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.planIcon}>
          <MaterialIcons name="business" size={24} color="#f08c00" />
        </View>
        <View style={styles.planInfo}>
          <Text style={styles.planName}>Bussiness Gold Plan Mov</Text>
          <Text style={styles.planFeature}>Voz & Conectividad</Text>
        </View>
      </View>

      <View style={styles.pricingSection}>
        <Text style={styles.price}>14.99 + Iva c/línea</Text>
        <View style={styles.priceBadge}>
          <Text style={styles.priceBadgeText}>Plan Activo</Text>
        </View>
      </View>

      <View style={styles.featuresList}>
        <View style={styles.feature}>
          <MaterialIcons name="phone" size={16} color="#4caf50" />
          <Text style={styles.featureText}>Llamadas ilimitadas</Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="wifi" size={16} color="#4caf50" />
          <Text style={styles.featureText}>Internet de alta velocidad</Text>
        </View>
        <View style={styles.feature}>
          <MaterialIcons name="message" size={16} color="#4caf50" />
          <Text style={styles.featureText}>Mensajes SMS ilimitados</Text>
        </View>
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
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  header: {
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
    fontFamily: 'System',
  },
  planFeature: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: '500',
    fontFamily: 'System',
  },
  pricingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'System',
  },
  priceBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'System',
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontFamily: 'System',
  },
});

export default BusinessPlanCard;

# BOPACORPSA CRM - Aplicación React Native

Una aplicación completa de gestión de relaciones con clientes (CRM) para BOPACORPSA, desarrollada con React Native y Expo.

## 🚀 Características

### 👥 Sistema de Usuarios
- **Autenticación por roles**: Asesor y Administrador
- **Panel personalizado** según el rol del usuario
- **Gestión de usuarios** (admin y asesores con permisos)
- **Creación de nuevos usuarios** desde múltiples puntos

### 📱 Navegación por Tabs

#### **Para ASESOR:**
- **🏠 Inicio**: Dashboard principal con actividades y estadísticas
- **👥 Clientes**: Lista completa de clientes con búsqueda y filtros
- **📅 Actividades**: Gestión de todas las actividades (próximas/recientes)
- **👤 Perfil**: Información personal y gestión de equipo

#### **Para ADMINISTRADOR:**
- **📊 Dashboard**: Estadísticas del sistema y gestión general
- **👥 Usuarios**: Gestión completa de usuarios del sistema
- **🛠️ Servicios**: Catálogo de servicios ofrecidos
- **⚙️ Sistema**: Configuración y mantenimiento

### 👨‍💼 Gestión de Clientes
- **Información completa**: empresa, contacto, dirección, teléfono, email
- **Foto de perfil** con galería/cámara
- **Estados del cliente**: Lucrativo, Prospecto, Inactivo
- **Historial de actividades**
- **Plan de negocio** asignado

### 📅 Gestión de Actividades
- **Tipos de actividades**: Visita Cotización, Visita Técnica, Llamada, etc.
- **Estados**: Requiere aprobación, Pendiente, Completado, etc.
- **Prioridades**: Baja, Media, Alta, Urgente
- **Fechas y horarios** programados
- **Notas y descripciones**

### 🛠️ Gestión de Servicios
- **Catálogo completo** de servicios
- **Categorías**: Consultoría, Tecnología, Auditoría, Capacitación
- **Precios y duración**
- **Estados**: Activo/Inactivo

### 📱 Funcionalidades Interactivas
- **Búsqueda en tiempo real**
- **Filtros avanzados**
- **Subida de fotos** (galería/cámara)
- **Llamadas directas** desde la app
- **Envío de emails** directo
- **Botones de acción rápida**

## 🎨 Diseño

- **Colores corporativos**: Azules profesionales (#1976d2)
- **Interfaz moderna** con Material Design
- **Navegación intuitiva** con React Navigation
- **Animaciones suaves** y transiciones
- **Responsive** para diferentes tamaños de pantalla

## 📦 Tecnologías Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación entre pantallas
- **Expo Image Picker** - Subida de fotos
- **Material Icons** - Iconografía

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js
- Expo CLI
- Dispositivo móvil o emulador

### Instalación
```bash
npm install
```

### Ejecución
```bash
npm start
```

### Credenciales de Prueba
- **Asesor**: asesor@empresa.com / 123456
- **Admin**: admin@empresa.com / 123456

## 📱 Estructura de Navegación

### **Navegación Principal:**
1. **Login** - Autenticación por roles (Asesor/Admin)

### **Tabs del ASESOR:**
1. **🏠 Inicio** - Dashboard con actividades y estadísticas
2. **👥 Clientes** - Lista y gestión de clientes
3. **📅 Actividades** - Gestión completa de actividades
4. **👤 Perfil** - Información personal y gestión de equipo

### **Tabs del ADMINISTRADOR:**
1. **📊 Dashboard** - Estadísticas y gestión general
2. **👥 Usuarios** - Gestión completa de usuarios
3. **🛠️ Servicios** - Catálogo de servicios
4. **⚙️ Sistema** - Configuración del sistema

### **Pantallas Modales/Stack:**
1. **Detalle de Cliente** - Información completa del cliente
2. **Agregar/Editar Cliente** - Formulario completo de clientes
3. **Agregar/Editar Actividad** - Gestión de actividades
4. **Agregar/Editar Usuario** - Creación de usuarios (todos los roles)

## 🎯 Funcionalidades Clave

### Para ASESOR:
- ✅ Ver y gestionar clientes
- ✅ Crear y editar actividades
- ✅ Buscar y filtrar información
- ✅ Acceder a detalles de clientes
- ✅ Llamar y enviar emails directamente
- ✅ Gestionar miembros de su equipo
- ✅ Crear nuevos usuarios/asesores

### Para ADMINISTRADOR:
- ✅ Todas las funciones de asesor
- ✅ Gestionar usuarios del sistema
- ✅ Administrar catálogo de servicios
- ✅ Ver estadísticas del sistema
- ✅ Configurar parámetros generales
- ✅ Acceso completo a todas las funciones

## 🔧 Personalización

La aplicación está diseñada para ser fácilmente personalizable:

- **Colores**: Variables centralizadas en los estilos
- **Textos**: Configurables para diferentes idiomas
- **Funcionalidades**: Módulos independientes
- **API**: Preparada para integración con backend

## 📋 Estado del Desarrollo

- ✅ Autenticación y roles
- ✅ Dashboards completos
- ✅ Gestión de clientes
- ✅ Gestión de actividades
- ✅ Gestión de servicios
- ✅ Gestión de usuarios
- ✅ Subida de fotos
- ✅ Búsqueda y filtros
- ✅ Navegación completa
- ✅ Diseño responsive

## 🔮 Próximas Funcionalidades

- [ ] Integración con API REST
- [ ] Base de datos local (SQLite)
- [ ] Notificaciones push
- [ ] Sincronización offline
- [ ] Reportes avanzados
- [ ] Calendario integrado
- [ ] Geolocalización
- [ ] Chat interno

---

**Desarrollado para BOPACORPSA** - Sistema de gestión empresarial completo

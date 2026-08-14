# Inversiones El Millón — Plataforma demo completa

Demo comercial de concesionario con inventario real administrable.

## Incluye
- Sitio público responsive
- Hero con video Cloudinary en autoplay
- 7 unidades reales con galerías completas
- Fichas fullscreen de vehículo
- Equipamiento detallado con estados Sí / No / A consultar
- Buscador y ordenamiento
- Simulador de financiamiento
- Trade-in y búsqueda personalizada
- WhatsApp, email, Instagram y Google Maps
- Panel administrativo
- Alta, edición, vendido/reactivar y eliminación de vehículos
- Carga de fotos con selector visual tipo galería desde iPhone o Android
- Preparado para persistencia en Supabase + Supabase Storage
- Esquema Supabase con galería y equipamiento en JSONB

## Demo local
`index.html` abre el sitio público y `admin.html` abre el panel.
La demo guarda el inventario en `localStorage`. Las fotos nuevas seleccionadas desde el teléfono se comprimen para facilitar la demostración. En producción el mismo flujo debe guardar archivos en Supabase Storage.

## Smart WhatsApp Routing — guía de demo

La demo incluye un módulo **Equipo WhatsApp** dentro del panel de control. Su objetivo es mostrar cómo funcionaría el concesionario cuando utiliza más de un número de WhatsApp.

### Cómo funciona

1. El cliente ve un solo botón: **Hablar con un asesor**. No tiene que elegir vendedor.
2. En el panel se cargan los asesores, sus números, su especialidad y si están activos.
3. Para consultas generales o de vehículos, el sistema reparte los leads entre los asesores activos mediante rotación.
4. Si la consulta es de financiamiento y existe un asesor marcado con especialidad **Financiamiento**, ese asesor tiene prioridad. Lo mismo puede hacerse con **Trade-in**.
5. El CRM guarda el asesor asignado junto con el vehículo y el origen de la consulta.

### Ejemplo

Si hay tres números activos:

- Asesor 1 — Ventas generales
- Asesor 2 — Ventas generales
- Asesor 3 — Financiamiento

Una consulta general puede ir al Asesor 1, la siguiente al Asesor 2 y la próxima nuevamente al Asesor 1. Una solicitud de financiamiento se deriva primero al Asesor 3.

### Demo vs. versión final

En esta demo la configuración, la rotación y los leads se guardan con `localStorage`, por lo que funcionan dentro del mismo navegador/origen. En producción, el mismo flujo debe conectarse a Supabase o al backend definitivo para que la asignación sea centralizada, persistente y compartida por todos los dispositivos.

El número actual de Inversiones El Millón queda cargado como **Asesor principal**. Los otros dos espacios quedan listos para cargar números reales desde el panel sin tocar el diseño de la demo.

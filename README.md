# Equilibrio Estudiantil

## Problema
Personas beneficiarias: Estudiantes y compañeros que necesitan concentrarse mejor o desean rendir mejor y evitar el cansancio extremo al estudiar.
Evidencia inicial: Observación y experiencia de cómo el exceso de tiempo continuo sin descansos reduce la concentración y aumenta el estrés antes de los exámenes o entregas de proyectos.

## Solución
Descripción de la solución: Crearé una aplicación móvil orientada a la técnica Pomodoro adaptada al ritmo escolar, que permita gestionar bloques de estudio y descansos con alertas visuales y un registro diario de productividad.
Funcionalidades principales: 1. Temporizador Pomodoro Activo — Iniciar, pausar y reiniciar la cuenta regresiva de estudio (por ejemplo, 25 min) y de descanso (5 min) con cambios visuales claros en pantalla.
2. Selector de Modos de Estudio — Elegir entre un modo rápido de repaso (25/5 min) o un modo profundo de estudio (45/15 min) según la necesidad del momento.
3. Registro Diario de Ciclos — Visualizar un contador simple con el total de bloques de estudio completados durante la jornada escolar para medir el progreso del día.
Recorrido de uso: El usuario abre la aplicación y visualiza la pantalla principal con el temporizador listo y el modo de estudio seleccionado.Selecciona el modo deseado (por ejemplo, repaso corto o programación) y presiona el botón "Iniciar" para activar la cuenta regresiva.Al finalizar el tiempo de concentración, la app avisa el cambio de ciclo y suma automáticamente un bloque completado al registro diario del estudiante.
Pantallas previstas: Pantalla Principal: Mostrar la cuenta regresiva activa, los botones de control (iniciar, pausar, reiniciar) y el selector de modos.
Pantalla de Estadísticas / Resumen: Ver el contador diario de bloques completados y un pequeño historial de la jornada.
Pantalla de Configuración / Tips: Ajustar preferencias básicas de la app y visualizar tips rápidos de descanso y bienestar visual.
Diferenciación: No busca ser una app genérica de productividad con funciones complejas o pagos; está pensada específicamente para las necesidades de los estudiantes técnicos, combinando un diseño minimalista, control de tiempos de descanso visual y la optimización para evitar el cansancio frente a las largas sesiones de estudio. ________________________________________________________________________________
Comprobaciones: Cuando el usuario presione el botón de "Iniciar", el temporizador debe comenzar la cuenta regresiva de forma fluida y cambiar el color/diseño del estado visual a "En Concentración".
Resumen: Quiero resolver la fatiga mental y la mala gestión del tiempo de los estudiantes mediante una app móvil de temporizador Pomodoro en React Native. La primera versión permitirá elegir entre dos modos de estudio (repaso o estudio), controlar la cuenta regresiva de concentración y descanso, y llevar un registro diario de bloques completados para mejorar la productividad escolar.

## Objetivos
- Permitir elegir entre dos modos de estudio (25/5 min y 45/15 min) con cuenta regresiva continua entre pantallas
- Garantizar que al presionar Iniciar la cuenta regresiva (25:00 o 45:00) comience en menos de 500ms con precisión de 1 segundo y continúe sin detenerse ni crashear al cambiar de pantalla o pasar brevemente a segundo plano.
- Verificar que al llegar el temporizador a 00:00 se active automáticamente el estado de descanso con alerta visual/vibración y el contador diario sume +1 en menos de 1 segundo sin duplicar registros.
- Comprobar que el contador diario guardado en AsyncStorage conserve el valor exacto tras cerrar y reabrir la app, reiniciándose automáticamente a 0 al detectar el cambio de fecha del día siguiente.

## Habilidades
- React Native con Expo y TypeScript
- Manejo de estado local y custom hooks (useState y useEffect)
- Navegación entre pantallas con Expo Router
- Componentes reutilizables y props tipadas
- Persistencia de datos local con AsyncStorage

## Alcance inicial
Sí incluirá en el MVP: El temporizador funcional con cuenta regresiva, el cambio entre dos modos de estudio (repaso 25/5 min y programación 45/15 min), los botones de control (iniciar, pausar, reiniciar) y el conteo diario persistente de bloques completados.
No incluirá todavía: Sincronización en la nube, cuentas de usuario, bases de datos externas, notificaciones push complejas ni pasarelas de pago.

## Restricciones
- Riesgo y plan: Revisar la documentación oficial de hooks (useEffect, setInterval) y realizar pruebas pequeñas en un componente aislado antes de integrarlo al diseño final.

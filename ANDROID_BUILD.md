# 📱 MateVentura - Guía para Android

## ✅ ¡Ya está configurado!

Tu proyecto ya tiene Capacitor configurado y listo para generar una app de Android.

---

## 🛠️ Requisitos previos

### 1. Instalar Android Studio
- Descarga: https://developer.android.com/studio
- Instala Android Studio completo
- Durante la instalación, asegúrate de instalar:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)

### 2. Configurar variables de entorno

**En Windows:**
```bash
ANDROID_HOME=C:\Users\TuUsuario\AppData\Local\Android\Sdk
```

**En Mac/Linux:**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
```

---

## 🚀 Workflow de desarrollo

### Después de hacer cambios en `index.html`:

```bash
# 1. Sincronizar cambios con Android
npm run sync

# 2. Abrir en Android Studio
npm run android
```

---

## 📦 Generar APK para pruebas

### Opción 1: Desde Android Studio (Recomendado para principiantes)

1. Abre el proyecto en Android Studio:
   ```bash
   npm run android
   ```

2. En Android Studio:
   - Menu: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - Espera a que termine el build
   - Click en "locate" para ver el APK generado
   - El APK estará en: `android/app/build/outputs/apk/debug/app-debug.apk`

3. Instala en tu dispositivo Android:
   - Conecta tu teléfono por USB
   - Habilita "Depuración USB" en opciones de desarrollador
   - Arrastra el APK al teléfono o usa:
     ```bash
     adb install android/app/build/outputs/apk/debug/app-debug.apk
     ```

### Opción 2: Desde la terminal

```bash
cd android
./gradlew assembleDebug
```

---

## 🎨 IMPORTANTE: Personalizar iconos y splash screen

**Antes de publicar**, necesitas crear:

### Icono de la app (Icon)
- Tamaño recomendado: **1024x1024 px**
- Formato: PNG con fondo transparente o de color
- Ubicación: crea `resources/icon.png`

### Pantalla de inicio (Splash)
- Tamaño recomendado: **2732x2732 px**
- Formato: PNG
- Ubicación: crea `resources/splash.png`

### Generar todos los tamaños automáticamente:

1. Instala la herramienta:
   ```bash
   npm install -D @capacitor/assets
   ```

2. Genera todos los tamaños:
   ```bash
   npx capacitor-assets generate --android
   ```

---

## 📝 Generar APK firmado para Google Play

### Paso 1: Generar keystore

```bash
keytool -genkey -v -keystore mateaventura-release.keystore -alias mateaventura -keyalg RSA -keysize 2048 -validity 10000
```

**IMPORTANTE:**
- Guarda la contraseña en un lugar seguro
- Nunca subas el keystore a Git
- Si lo pierdes, no podrás actualizar tu app

### Paso 2: Configurar signing en Android

Edita `android/app/build.gradle` y agrega antes de `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android { ... }`, agrega:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### Paso 3: Crear archivo de propiedades

Crea `android/key.properties`:

```properties
storePassword=TU_PASSWORD
keyPassword=TU_PASSWORD
keyAlias=mateaventura
storeFile=../mateaventura-release.keystore
```

### Paso 4: Generar APK firmado

```bash
cd android
./gradlew assembleRelease
```

El APK firmado estará en:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 🏪 Publicar en Google Play Store

### 1. Crear cuenta de desarrollador
- Ir a: https://play.google.com/console
- Pago único: $25 USD
- Completa tu perfil de desarrollador

### 2. Crear nueva aplicación
- Click en "Crear aplicación"
- Nombre: **MateVentura**
- Idioma predeterminado: Español
- Tipo: App / Juego

### 3. Completar información requerida

**Ficha de la tienda:**
- Título: MateVentura - Aventura Matemática
- Descripción corta (80 caracteres):
  ```
  Juegos educativos de matemáticas para niños. ¡Aprende sumando, restando y más!
  ```
- Descripción completa:
  ```
  MateVentura es una aventura educativa que hace que aprender matemáticas sea divertido.

  🎮 JUEGOS INCLUIDOS:
  • Asteroides Matemáticos - Resuelve operaciones antes de que caigan
  • Memoria Matemática - Encuentra parejas de problemas y soluciones
  • Crucigrama Numérico - Rellena el crucigrama con números

  ⚙️ CARACTERÍSTICAS:
  • 4 niveles de dificultad adaptables
  • Operaciones: suma, resta, multiplicación, división
  • Interfaz colorida y amigable para niños
  • Sin necesidad de conexión a internet
  • 3 idiomas: Español, Inglés, Húngaro

  Perfecto para niños de 6 a 12 años que quieren mejorar en matemáticas mientras se divierten.
  ```

**Capturas de pantalla:**
- Mínimo 2, máximo 8
- Tamaño: 1080x1920 px (vertical) o 1920x1080 px (horizontal)
- Toma screenshots del juego en acción

**Gráfico de la aplicación:**
- 512x512 px
- PNG con fondo

**Gráfico destacado:**
- 1024x500 px
- Para aparecer en destacados

### 4. Clasificación de contenido
- Completa el cuestionario
- Selecciona "Contenido educativo"
- Edad: PEGI 3 / Everyone

### 5. Política de privacidad
**Si NO recoges datos:**
- Puedes usar un generador: https://app-privacy-policy-generator.firebaseapp.com/

**Actualmente MateVentura NO recoge datos**, así que tu política puede ser simple.

### 6. Subir APK/AAB

**Google recomienda AAB** (Android App Bundle) en lugar de APK:

```bash
cd android
./gradlew bundleRelease
```

El AAB estará en: `android/app/build/outputs/bundle/release/app-release.aab`

Súbelo en la sección "Versión de producción"

### 7. Enviar a revisión
- Revisa todo
- Click en "Enviar a revisión"
- Espera 1-3 días para aprobación

---

## 💰 Configurar monetización

### Opción 1: Anuncios con AdMob

1. Crear cuenta en AdMob: https://admob.google.com/
2. Instalar plugin:
   ```bash
   npm install @capacitor-community/admob
   npx cap sync
   ```

### Opción 2: Compras in-app

1. Instalar plugin:
   ```bash
   npm install @capacitor-community/in-app-purchases
   npx cap sync
   ```

### Opción 3: Versión de pago
- Establece un precio en Google Play Console
- Recomendado: $0.99 - $2.99

---

## 🎯 Próximos pasos recomendados

1. **Crear iconos profesionales** - Usa Canva o contrata un diseñador
2. **Agregar sonidos** - Efectos de sonido para mejor experiencia
3. **Vibración** - Feedback háptico al tocar botones
4. **Analytics** - Google Analytics para ver uso
5. **Sistema de logros** - Gamificación para engagement
6. **Modo offline perfecto** - Ya funciona, pero pruébalo bien

---

## 🐛 Solución de problemas comunes

**Error: "SDK not found"**
```bash
# Verifica que ANDROID_HOME esté configurado
echo $ANDROID_HOME  # Mac/Linux
echo %ANDROID_HOME%  # Windows
```

**Error al sincronizar Gradle**
```bash
# Limpia y reconstruye
cd android
./gradlew clean
./gradlew build
```

**App no se instala en el teléfono**
- Verifica que "Depuración USB" esté activada
- Permite "Instalar apps de origen desconocido"
- Revisa que el cable USB permita transferencia de datos

---

## 📞 Recursos útiles

- **Documentación Capacitor**: https://capacitorjs.com/
- **Guía de Google Play**: https://support.google.com/googleplay/android-developer
- **Foro de Android Studio**: https://stackoverflow.com/questions/tagged/android-studio

---

## ✅ Checklist antes de publicar

- [ ] Icono de app personalizado (1024x1024)
- [ ] Splash screen personalizado (2732x2732)
- [ ] APK/AAB firmado generado
- [ ] Probado en al menos 2 dispositivos diferentes
- [ ] Capturas de pantalla tomadas (mínimo 2)
- [ ] Descripción de la app escrita
- [ ] Política de privacidad creada
- [ ] Clasificación de contenido completada
- [ ] Precio/monetización decidido
- [ ] Cuenta de Google Play creada ($25)

---

**¡Buena suerte con tu app! 🚀**

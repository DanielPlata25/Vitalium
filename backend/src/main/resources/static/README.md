# Vittalium - E-commerce de Suplementos Alimenticios

> Plataforma B2C para la venta de suplementos alimenticios certificados en México

**Equipo**: Modular Minds  
**Fecha de lanzamiento**: 04 de Marzo 2026

---

## 📖 ¿Qué es Vittalium?

Vittalium es un e-commerce mexicano especializado en suplementos alimenticios certificados por COFEPRIS. Ofrecemos productos nacionales con entregas rápidas y un sistema de recomendaciones personalizadas para adultos de 25-45 años que buscan mejorar su salud y bienestar.

### Funcionalidades principales:
- Catálogo de productos multimarca
- Sistema de registro y autenticación de usuarios
- Carrito de compras
- Gestión de inventario
- Motor de recomendaciones personalizado

---

## 🛠 Tecnologías que Usaremos

### Backend
- **Java 21** - Lenguaje de programación principal
- **Spring Boot 3** - Framework para crear la API REST
- **MySQL** - Base de datos relacional
- **Maven** - Gestor de dependencias

### Frontend
- **HTML5** - Estructura de las páginas
- **CSS3** - Estilos y diseño
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **JavaScript (ES6)** - Interactividad y validaciones

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio del código
- **Postman** - Para probar las APIs
- **Jira** - Gestión de tareas (Scrum)


---


**Páginas que vamos a crear**:
1. Inicio (Landing page)
2. Catálogo de productos
3. Login / Registro
4. Carrito de compras
5. Acerca de nosotros
6. Contacto

---

## 🚀 Configuración Inicial (Solo cuando sea necesario)

### Lo que necesitas tener instalado:
- **Java 21** (JDK)
- **MySQL**
- **Git**

### Clonar el proyecto:
```bash
git clone https://github.com/ModularMinds/vittalium.git
cd vittalium
```

**Nota**: La configuración detallada de Spring Boot y MySQL la haremos juntos en el Sprint 6. Por ahora solo necesitas Git para trabajar.


---

## 🌿 Cómo nombrar tus ramas (branches)

**Formato que SIEMPRE debes usar:**
```
<tipo>/<ticket-jira>-descripcion-corta
```

### Tipos de ramas:

| Tipo | ¿Cuándo usarlo? | Ejemplo |
|------|----------------|---------|
| `feature/` | Cuando creas algo nuevo | `feature/VIT-101-login-usuarios` |
| `bugfix/` | Cuando arreglas un error | `bugfix/VIT-202-error-carrito` |
| `docs/` | Cuando actualizas documentación | `docs/VIT-303-readme-instalacion` |

### Ejemplos CORRECTOS ✅:
```bash
feature/VIT-123-agregar-productos
bugfix/VIT-456-corregir-precios
docs/VIT-789-actualizar-readme
```

### Ejemplos INCORRECTOS ❌:
```bash
feature/login                    # ❌ Falta el número de ticket
mi-nueva-funcionalidad           # ❌ No tiene el formato correcto
feature/VIT-123_login_usuarios   # ❌ Usa guiones (-), NO guiones bajos (_)
```

---

## 💬 Cómo escribir mensajes de commit

**Formato:**
```
<tipo>: <descripción corta>
```

### Tipos más comunes:

| Tipo | ¿Cuándo usarlo? | Ejemplo |
|------|----------------|---------|
| `feat` | Agregas algo nuevo | `feat: agregar formulario de login` |
| `fix` | Corriges un bug | `fix: corregir error en validación` |
| `docs` | Cambias documentación | `docs: actualizar README` |
| `style` | Cambias estilos CSS | `style: ajustar color de botones` |

### Reglas básicas:
1. ✅ Usa minúsculas
2. ✅ Sin punto al final
3. ✅ Sé claro y breve
4. ✅ Escribe en presente: "agrega" no "agregó"

### Ejemplos BUENOS ✅:
```bash
feat: agregar página de productos
fix: corregir error al guardar usuario
docs: actualizar guía de instalación
style: cambiar color del navbar
```

### Ejemplos MALOS ❌:
```bash
Agregué cosas              # ❌ No es claro
fix: arreglé un bug.       # ❌ Tiene punto final
FEAT: NUEVA PAGINA         # ❌ Todo en mayúsculas
```

---


### 2️⃣ Crear tu propia rama para trabajar
```bash
# Asegúrate de estar en develop
git checkout develop

# Trae los últimos cambios
git pull origin develop

# Crea tu rama nueva
git checkout -b feature/VIT-123-mi-tarea
```

**Explicación:**
- `git checkout develop o main` → Te mueves a la rama principal
- `git pull` → Descargas los últimos cambios
- `git checkout -b` → Creas Y te mueves a tu nueva rama

### 3️⃣ Hacer cambios y guardarlos (commit)
```bash
# Haces cambios en tu código...
# ...

# Ver qué archivos cambiaste
git status

# Agregar TODOS los archivos modificados
git add .

# O agregar solo un archivo específico
git add index.html

# Guardar los cambios con un mensaje
git commit -m "feat: agregar formulario de login"
```

### 4️⃣ Subir tu rama a GitHub
```bash
git push origin feature/VIT-123-mi-tarea
```

### 5️⃣ Crear un Pull Request (PR)
1. Ve a GitHub en tu navegador
2. Verás un botón amarillo que dice "Compare & pull request"
3. Haz clic y llena la información:
   - **Título**: `[FEATURE] Agregar formulario de login`
   - **Descripción**: Explica qué hiciste
4. Asigna a alguien para que revise tu código
5. ¡Espera la aprobación!

---

## 🔄 Comandos Git que usarás a diario

### Ver en qué rama estás:
```bash
git branch
```
La rama con `*` es donde estás actualmente.

### Cambiar de rama:
```bash
git checkout nombre-de-la-rama
```

### Ver qué archivos modificaste:
```bash
git status
```

### Actualizar tu rama con los cambios de develop:
```bash
git checkout develop
git pull origin develop
git checkout tu-rama
git merge develop
```

### Si te equivocaste en algo (ANTES de hacer push):
```bash
# Deshacer el último commit (pero mantener cambios)
git reset --soft HEAD~1

# Deshacer cambios en un archivo
git checkout -- nombre-archivo.html
```

---

## 🚨 Errores comunes y cómo solucionarlos

### "No puedo hacer push"
```bash
# Alguien más hizo cambios. Primero trae los cambios:
git pull origin tu-rama
# Luego vuelve a intentar:
git push origin tu-rama
```

### "Estoy en la rama incorrecta"
```bash
# Si NO has hecho commit:
git checkout la-rama-correcta

# Si YA hiciste commit:
git stash                          # Guarda tus cambios temporalmente
git checkout la-rama-correcta
git stash pop                      # Recupera tus cambios
```

### "Conflictos al hacer merge"
1. Git te dirá qué archivos tienen conflicto
2. Abre esos archivos
3. Busca las líneas que dicen `<<<<<<<` y `>>>>>>>`
4. Decide qué código mantener
5. Elimina las marcas de conflicto
6. Guarda el archivo
7. Haz `git add .` y `git commit`

---

## 📋 Flujo de trabajo en equipo

```
develop (rama principal)
   ↓
   ├─── feature/VIT-101-login     ← Trabajas aquí
   ├─── feature/VIT-102-productos ← Tu compañero trabaja aquí
   └─── bugfix/VIT-103-error      ← Otro compañero aquí
```

**Regla de oro**: 
- Nunca trabajes directamente en `develop` o `main`
- Siempre crea tu propia rama
- Cuando termines, haz un Pull Request
- Espera aprobación antes de hacer merge

---

## ✅ Checklist antes de hacer un Pull Request

Antes de pedir que revisen tu código, verifica:

- [ ] Mi código funciona sin errores
- [ ] Probé los cambios en mi navegador
- [ ] Seguí el formato de nombres de ramas
- [ ] Mis commits tienen buenos mensajes
- [ ] No subí archivos innecesarios (como node_modules, .DS_Store)
- [ ] Actualicé mi rama con los últimos cambios de develop

---

## 🎯 Tips para nuevos en Git

1. **Haz commits pequeños y frecuentes**: Es mejor hacer 5 commits pequeños que 1 gigante
2. **Pull frecuentemente**: Actualiza tu rama al menos una vez al día
3. **No tengas miedo**: Git guarda todo, es muy difícil perder código
4. **Pide ayuda**: Si no entiendes algo, pregunta antes de hacer push
5. **Practica**: Mientras más uses Git, más fácil se vuelve


---


## 👥 Equipo Modular Minds

- Herrera Arizmendi Myriam
- Macías Rolón Itzel Alejandra  
- Martínez de la Cruz Andrea
- Osuna Delgado Jorge Luis
- Pérez Pérez José Emmanuel
- Plata Montes Daniel Alejandro
- Resillas Roman Alexis
- Sanchez García Rolando
- Sanchez Jimenez Jorge Luis
- Zepeda Almaraz Abilene

---

## 🆘 ¿Necesitas ayuda?

- **Git no funciona**: Pregunta en el grupo antes de seguir intentando
- **No entiendes algo**: Mejor preguntar 100 veces que romper el código
- **Conflictos en Git**: Pide ayuda del Scrum Master del sprint

---

## 📚 Recursos Útiles

- [Guía Git en Español](https://git-scm.com/book/es/v2)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.0/)
- [MySQL Tutorial](https://dev.mysql.com/doc/)

---
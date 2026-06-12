# Argentex — Especificación del Proyecto

## Descripción General

Argentex es una red social con identidad argentina. Los usuarios suben fotos, interactúan con publicaciones y gestionan su círculo social. La estética es argentina: colores de la bandera, vocablos del lunfardo y símbolos culturales propios del país.

---

## Identidad y Vocabulario

| Concepto genérico | Término en Argentex |
|---|---|
| Usuario / amigo | **Paisano** |
| Lista de amigos | **Paisanaje** |
| Dar "me gusta" | **Dar un mate** |
| Like / corazón | **Mate** (ícono de mate) |
| Solicitud de amistad | Solicitud de paisanaje |

> La interfaz nunca usa la palabra "like" ni "amigo". Siempre "mate" y "paisano/paisanaje".

---

## Tecnologías

### Backend
| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | LTS | Runtime |
| Express | ^5.2 | Framework HTTP |
| MongoDB | — | Base de datos |
| Mongoose | ^9.6 | ODM |
| JSON Web Tokens | ^9.0 | Autenticación |
| bcrypt / bcryptjs | ^6 / ^3 | Hash de contraseñas |
| Nodemailer | ^8.0 | Envío de emails |
| cookie-parser | ^1.4 | Parseo de cookies |
| cors | ^2.8 | CORS |
| dotenv | ^17 | Variables de entorno |
| nodemon | ^3.1 | Hot reload en desarrollo |

### Frontend
| Tecnología | Versión | Rol |
|---|---|---|
| React | ^19 | UI |
| TypeScript | ~6.0 | Tipado estático |
| Vite | ^8.0 | Bundler / Dev server |
| Tailwind CSS | ^4.3 | Estilos utilitarios |
| @tailwindcss/vite | ^4.3 | Plugin de integración Vite |
| React Router DOM | ^7.15 | Enrutamiento |
| React Hook Form | ^7.76 | Manejo de formularios |
| Axios | ^1.16 | Cliente HTTP |
| Bootstrap Icons | ^1.13 | Iconografía |

---

## Paleta de Colores

Los colores están inspirados en la bandera argentina y la identidad visual del país.

| Variable | Hex | Uso |
|---|---|---|
| Celeste primario | `#1D6FA4` | Fondos principales, botones primarios (background) |
| Celeste claro | `#74ACDF` | Acentos, hover, bordes activos |
| Blanco argentino | `#F0F8FF` | Textos principales, íconos, elementos claros |
| Negro profundo | `#111827` | Fondos oscuros, sidebar, bordes sutiles |

### Convenciones de uso (Tailwind v4 inline)
- Fondos de página: `bg-[#1D6FA4]`
- Cards / glassmorphism: `bg-[#74ACDF]/30 backdrop-blur-sm`
- Texto principal: `text-[#F0F8FF]`
- Bordes sutiles: `border-[#F0F8FF]/10` → `border-[#F0F8FF]/25`
- Sidebar y dark areas: `bg-[#111827]`
- Botón primario: `bg-[#F0F8FF] text-[#1D6FA4]`
- Error: `bg-red-500/20 border border-red-400/30`

> No se usa `tailwind.config.js`. La configuración es inline con Tailwind v4 y el plugin `@tailwindcss/vite`.

---

## Estructura de Carpetas

### Backend

```
backend/
├── config/
│   ├── bd.config.js          # Conexión a MongoDB
│   └── email.config.js       # Configuración de Nodemailer
├── controllers/
│   └── auth.controller.js    # Lógica de registro, login, verificación
├── middlewares/
│   └── verify-token.js       # Middleware JWT para rutas protegidas
├── models/
│   ├── user.model.js
│   ├── post.model.js
│   ├── comments.model.js
│   ├── likes.model.js        # Modelo de mates (likes)
│   └── friendship.model.js   # Modelo de paisanaje
├── repository/
│   └── auth.repository.js    # Acceso a datos de autenticación
├── routes/
│   └── auth.routes.js        # Definición de endpoints
├── app.js                    # Configuración Express (middlewares globales)
├── server.js                 # Inicialización del servidor
└── index.js                  # Entry point
```

### Frontend

```
frontend/
├── public/
│   └── images/               # Imágenes estáticas (logo, etc.)
├── src/
│   ├── assets/               # Recursos importados en código
│   ├── components/
│   │   ├── Sidebar.tsx       # Navegación lateral (controla la sección activa de Home)
│   │   └── VerifyAuth.tsx    # HOC de rutas protegidas
│   ├── context/
│   │   └── AuthContext.tsx   # Estado global de autenticación
│   ├── hooks/
│   │   └── authContextHook.tsx
│   ├── pages/
│   │   ├── Home.tsx          # Dashboard: Sidebar + sección activa (ver "Navegación por secciones")
│   │   ├── AddPost.tsx        # Sección "nueva-publicacion"
│   │   ├── MyProfile.tsx      # Sección "perfil"
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── VerifyUser.tsx
│   ├── services/
│   │   └── auth.service.ts   # Llamadas HTTP a la API de auth
│   ├── types/
│   │   ├── auth.types.ts     # Tipos TypeScript de autenticación
│   │   └── props.types.ts    # Tipos de props compartidos (sectionsType, SidebarProps)
│   ├── App.tsx               # Rutas principales
│   ├── index.css             # @import "tailwindcss"
│   └── main.tsx              # Entry point React
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Navegación por Secciones (Home)

`Home.tsx` es un dashboard de una sola ruta (`/inicio`). No usa sub-rutas de React Router para las áreas internas: mantiene un estado `activeSection` (tipo `sectionsType` en `types/props.types.ts`) que decide qué se renderiza en el área principal, mientras `Sidebar.tsx` controla ese estado.

```ts
type sectionsType = 'inicio' | 'notificaciones' | 'paisanaje' | 'nueva-publicacion' | 'perfil'
```

| Sección | Componente / contenido |
|---|---|
| `inicio` | Feed de publicaciones (placeholder, pendiente de implementar) |
| `notificaciones` | Notificaciones (placeholder, pendiente de implementar) |
| `paisanaje` | Gestión de paisanaje (placeholder, pendiente de implementar) |
| `nueva-publicacion` | `pages/AddPost.tsx` |
| `perfil` | `pages/MyProfile.tsx` |

> Nuevas pantallas del dashboard (feed, notificaciones, paisanaje) se agregan como componentes/páginas propias y se enchufan como una nueva rama condicional dentro de `Home.tsx`, no como rutas nuevas en `App.tsx`.

---

## Modelos de Base de Datos

### User
```js
{
  name:          String  (required)
  surname:       String  (required)
  username:      String  (required, unique)
  email:         String  (required, unique)
  password:      String  (required, hashed)
  photo:         String  (optional, URL)
  bio:           String  (optional)
  emailVerified: Boolean (default: false)
  birthDay:      Number  (required)
  birthMonth:    Number  (required)
  birthYear:     Number  (required)
  timestamps:    true
}
```

### Post
```js
{
  description: String   (required)
  fk_user:     ObjectId → User (required)
  photo:       String   (optional, URL)
  active:      Boolean  (default: true)
  timestamps:  true
}
```

### Comment
```js
{
  content:    String   (required)
  fk_user:   ObjectId → User (required)
  fk_post:   ObjectId → Post (required)
  timestamps: true
}
```

### Like (Mate)
> Modelo interno llamado `Like`, pero en la UI se representa como **"dar un mate"**.

```js
{
  fk_user:   ObjectId → User (required)
  fk_post:   ObjectId → Post (required)
  timestamps: true
}
```

### Friendship (Paisanaje)
> Gestiona las relaciones de paisanaje entre usuarios.

```js
{
  requester:  ObjectId → User (required)   // quien envía la solicitud
  recipient:  ObjectId → User (required)   // quien la recibe
  status:     String enum ['pending', 'accepted', 'blocked'] (default: 'pending')
  timestamps: true
  index:      { requester, recipient } unique
}
```

---

## Autenticación

- Registro con validación de edad mínima.
- Verificación de email vía enlace (Nodemailer).
- Login con JWT almacenado en cookie HTTP-only.
- Rutas protegidas con middleware `verify-token.js`.

---

## Rutas API (actuales)

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/register` | Registro de nuevo paisano |
| POST | `/login` | Login, devuelve JWT en cookie |
| POST | `/logout` | Cierra sesión, limpia la cookie del JWT |
| GET | `/dashboard` | Ruta protegida (requiere token) |
| GET | `/verify-email/:token` | Verificación de email |

---

## Estética Argentina

- Colores de bandera argentina (celeste y blanco).
- Vocabulario del lunfardo y cultura popular argentina.
- El ícono de "me gusta" es un **mate**, no un corazón ni un pulgar.
- Las relaciones sociales se llaman **paisanaje** y cada usuario es un **paisano**.
- El diseño debe evocar identidad nacional sin ser kitsch: elegante, moderno, pero inequívocamente argentino.

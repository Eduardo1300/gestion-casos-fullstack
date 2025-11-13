# 🚀 Sistema de Gestión de Casos – Fullstack (Next.js + Express + JWT)

Aplicación fullstack para la gestión de casos, diseñada con arquitectura modular, autenticación segura mediante JWT y una interfaz moderna y responsiva creada con Next.js.

Este proyecto demuestra habilidades clave para pruebas técnicas: CRUD real, autenticación, tipado estricto, diseño moderno, separación frontend/backend y buenas prácticas de arquitectura.

---

## 🌐 Demo en Vivo

- **Frontend:** [https://casos-demo.vercel.app](https://casos-demo.vercel.app)
- **Backend:** [https://casos-api.onrender.com](https://casos-api.onrender.com)

> **Nota:** El backend en Render usa almacenamiento en memoria. Los datos se reinician cuando el servidor se duerme o reinicia.

---

## 📸 Vista Previa


![Preview](./preview.png)

---

## 🏗️ Arquitectura del Proyecto

```
proyecto/
├── backend-casos/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts         # Punto de entrada del backend
│       ├── types.ts         # Tipos TypeScript para los casos
│       ├── middleware/
│       │   └── auth.ts      # Middleware JWT
│       └── routes/
│           ├── auth.ts      # Rutas de autenticación
│           └── casos.ts     # CRUD de casos
└── frontend-casos/
    ├── package.json
    ├── tsconfig.json
    ├── public/
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── globals.css
        │   ├── page.tsx
        │   ├── login/
        │   │   └── page.tsx
        │   └── casos/
        │       └── page.tsx
        ├── components/
        │   └── CasoForm.tsx
        └── lib/
            └── api.ts
```

---

## 🎯 ¿Por qué este proyecto es relevante para pruebas técnicas?

Este proyecto demuestra:

- ✔️ Autenticación real con JWT
- ✔️ CRUD completo y protegido
- ✔️ Uso de Next.js App Router
- ✔️ Arquitectura limpia y escalable
- ✔️ Separación clara frontend/backend
- ✔️ Validación y tipado estricto con TypeScript
- ✔️ UI moderna con Tailwind CSS
- ✔️ Buenas prácticas de APIs REST

Es ideal para mostrar dominio práctico en un flujo real de trabajo.

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- LocalStorage para guardar el token

### Backend

- Node.js + Express.js
- JWT para autenticación
- TypeScript
- Almacenamiento temporal en memoria

---

## 🔐 Variables de Entorno

### Backend (`backend-casos`)

Crea un archivo `.env`:

```env
JWT_SECRET=tu_secreto_personal
PORT=4000
```

### Frontend (`frontend-casos`)

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

---

## 📌 Funcionalidades

### Backend

- Login con JWT
- Listar casos
- Crear casos
- Editar casos
- Eliminar casos
- Middleware de autenticación
- Tipado estricto y validado

### Modelo de un Caso

| Campo        | Tipo    | Descripción                |
|--------------|---------|----------------------------|
| id           | UUID    | Identificador único        |
| nombre       | string  | Nombre del caso            |
| descripcion  | string  | Descripción (opcional)     |
| estado       | string  | Estado (ej: "nuevo")       |
| prioridad    | string  | baja, media, alta          |
| responsable  | string  | Responsable (opcional)     |

### Endpoints

| Método | Ruta           | Descripción                    |
|--------|----------------|--------------------------------|
| POST   | /auth/login    | Obtiene el JWT                 |
| GET    | /casos         | Listar casos (requiere JWT)    |
| POST   | /casos         | Crear caso (JWT)               |
| PUT    | /casos/:id     | Actualizar caso (JWT)          |
| DELETE | /casos/:id     | Eliminar caso (JWT)            |

### Usuario Demo

| Usuario           | Contraseña |
|-------------------|------------|
| demo@demo.com     | Demo1234   |

### Frontend

- Login con persistencia de sesión
- Dashboard de casos
- Crear, editar y eliminar casos
- Modo claro/oscuro
- UI moderna con Tailwind
- Manejo de tokens en localStorage
- Validación desde formulario

---

## 🚀 Instalación y Ejecución

### Backend

```bash
cd backend-casos
npm install
npm run dev
```

Corre en: [http://localhost:4000](http://localhost:4000)

### Frontend

```bash
cd frontend-casos
npm install
npm run dev
```

Corre en: [http://localhost:3000](http://localhost:3000)

---

## 🧭 Flujo de Uso

1. Entra a `/login`
2. Usa el usuario demo
3. Accede al dashboard
4. Crea, edita o elimina casos
5. El token se guarda en localStorage y se envía en cada request

---

## 📅 Roadmap

- 🔜 Persistencia con PostgreSQL
- 🔜 Roles y permisos
- 🔜 Búsquedas y filtros avanzados
- 🔜 Logs y auditoría
- 🔜 Notificaciones
- 🔜 Despliegue con Docker

---

## 📝 Notas

- El backend en Render reinicia datos al dormir el servicio (almacenamiento en memoria).
- El campo responsable es opcional.
- La arquitectura está lista para escalar hacia bases de datos reales.

---

## 👤 Autor

**Christopher Eduardo Valdivia Baca**

- Backend: Express.js + TypeScript
- Frontend: Next.js + TypeScript + Tailwind CSS
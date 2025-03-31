# Somosrentable frontend

## Configuración
Primero nos ubicaremos en la carpeta raíz de frontend (carpeta frontend)
```
git clone https://github.com/josejose93/somosrentable
cd somosrentable/frontend
```
una vez dentro instalaremos los paquetes necesarios para la aplicación con:

```
npm install
```

es necesario crear un archivo .env.local y dentro colocar la ruta del backend por ejemplo:
```
touch .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```
Luego corremos el servidor con:

```
npm run dev -- -p 3000
```

Escogemos la siguiente url para abrir la aplicación (si es que no estuviera por defecto), esto es importante para que se integre con el backend:
```
http://localhost:3000/
```

Listo!!

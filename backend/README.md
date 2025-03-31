# Somosrentable Backend

## Configuración
Lo primero que haremos será configurar nuestras variables de ambiente.

Para esto, creamos un archivo .env
```
touch .env
```

Dentro del archivo .env pondremos lo siguiente reemplazando DATABASE USERNAME y PASSWORD con el nombre de la database, el usuario postgres y la contraseña respectivamente (TODO SIN ESPACIOS):

```
DATABASE_NAME=DATABASE
DATABASE_USER=USERNAME
DATABASE_PASS=PASSWORD
```

Por ejemplo, si creamos anteriormente la base de datos somosrentable, la primera línea del archivo .env sería:
```
DATABASE_NAME=somosrentable
```

Ahora como último paso haremos las migraciones de la base de datos

```
python manage.py makemigrations
python manage.py migrate
```

Ahora poblaremos data dummy
```
python setup.py
```
Una vez corrido el script tendremos data lista para probar la app, creamos 1 user agente, 1 user normal y propiedades asociadas al agente, para loguearnos con los respectivos users estas son las credenciales:
```
username agente: agent2
password agente: supersecret123456

username normal: user2
password: supersecret123456
```

Ya estamos listos para correr nuestro servido backend !!!
```
python manage.py runserver
```

Abrimos otra terminal en la que configuraremos el servidor frontend, continuaremos los siguientes pasos aquí: [frontend](https://github.com/josejose93/somosrentable/tree/main/frontend)

# practicaASI

## Ejecución
```bash
sudo apt update
sudo apt install openjdk-17-jdk
```

Comprobar que la versión de java openjdk es la 17

```bash
java --version
```

Ejecutar el backend:

```bash
cd seton/
mvn clean install
mvn spring-boot:run
```

Configuración frontend:

```bash
cd seton/frontend/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 16
yarn install
yarn start
```

## Flujo de trabajo
En el proyecto de github entra en una issue, asignate la issue y haz click en 'create branch' 
para comenzar el desarrollo de esa issue. En local:
```bash
git fetch origin
git checkout <nombre-rama>
```

Hacer el desarrollo de la funcionalidad en esa rama y al terminar mergearla con main haciendo
una pull request.

## Diagrama base de datos
![](db.png)

- Users: administrador o profesor/estudiante.
- Teacher: profesor.
- Student: estudiante.
- Language: idioma.
- Schedule: horario.
- Class: clase.
- ClassSchedule: relación entre clase y horario.
- Inscription: relación entre clase y estudiante.
## Funcionalidades
Url para acceder a la parte de admin: http://localhost:3000/#/admin

u: admin, c: admin
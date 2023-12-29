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

Instalación de mvn (comprobar que es versión 3.6.3):
```bash
sudo apt install maven
mvn --v
```

Ejecutar el backend:

```bash
cd seton/
mvn clean install
mvn spring-boot:run
```

Si la ejecución de mvn clean install da fallos por la falta de dependencias de frontend es necesario añadir primero esas
dependencias con yarn (apartado otras dependencias).

Configuración frontend:

```bash
cd seton/frontend/
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 16
sudo apt install yarn
yarn install
yarn start
```

Si el yarn install da fallo y se ha descargado la versión 0.32+git se puede actualizar usando los siguientes comandos:
```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn
```

Otras dependencias que son necesarias añadir:
```bash
yarn add bootstrap
yarn add @popperjs/core
yarn add react-datepicker moment
```

## Funcionalidades
Url para acceder a la parte de profesor/estudiante
(una vez creada alguna cuenta en la parte de administrador): http://localhost:3000/

Url para acceder a la parte de admin: http://localhost:3000/admin

usuario: admin, contraseña: admin

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

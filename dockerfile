# Use a imagem do MySQL como base
FROM mysql:latest

# Defina as variáveis de ambiente para o MySQL
ENV MYSQL_ROOT_PASSWORD=deezerapi123
ENV MYSQL_DATABASE=deezer
ENV MYSQL_USER=deezermanager

# Defina o nome do contêiner como mysqldeezer
ENV MYSQL_CONTAINER_NAME=mysqldeezer

# Expõe a porta 3306
EXPOSE 3306

# Instale o Node.js e o npm
RUN apt-get update && apt-get install -y \
  curl \
  && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho como /app
WORKDIR /app

# Copie a pasta local para o contêiner
COPY . /app

# Execute o comando npm run dev
CMD ["npm", "run", "dev"]
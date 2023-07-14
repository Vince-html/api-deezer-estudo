const Docker = require('dockerode');
const docker = new Docker();

const startContainer = async () => {
  const containers = await docker.listContainers({ all: true });
  const container = containers.find((c) => c.Names.includes('/mysqldeezer'));

  if (container) {
    const containerObj = docker.getContainer(container.Id);
    await containerObj.start();

    console.log('Container iniciado.');
  } else {
    console.log('Container não encontrado.');
  }
};

module.exports = {
  startContainer,
};

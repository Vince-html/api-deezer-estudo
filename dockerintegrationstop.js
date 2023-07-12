const Docker = require('dockerode');
const docker = new Docker();

const stopContainer = async () => {
  const containers = await docker.listContainers({ all: true });
  const container = containers.find((c) => c.Names.includes('/mysqldeezer'));

  if (container) {
    const containerObj = docker.getContainer(container.Id);
    await containerObj.stop();
    console.log('Container encerrado.');
  } else {
    console.log('Container não encontrado.');
  }
};

module.exports = {
  stopContainer,
};

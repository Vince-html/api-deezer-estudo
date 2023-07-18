const { startContainer } = require('./dockerintegrationstart');
const { execSync } = require('child_process');

const initProject = async () => {
  await startContainer();
  execSync('npm run dev', {
    stdio: 'inherit',
  });
};

initProject();

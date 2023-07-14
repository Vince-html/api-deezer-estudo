const { execSync } = require('child_process');
const { stopContainer } = require('../dockerintegrationstop');
const { startContainer } = require('../dockerintegrationstart');

const runTests = async () => {
  try {
    const variavel = process.argv[2];
    console.log('Executando testes para o path:', variavel);
    await startContainer();
    console.log('Iniciando testes...');
    execSync(`jest --verbose --coverage --testPathPattern=${variavel}`, {
      stdio: 'inherit',
    });
    console.log('Testes concluídos com sucesso.');
  } catch (error) {
    console.error('Erro ao executar os testes:', error);
    process.exit(1);
  } finally {
    await stopContainer();
  }
};

runTests();

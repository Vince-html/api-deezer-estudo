const fs = require('fs');

const pwd = './useCase/getTracks';

const metodo: { [key: string]: string } = {
  post: 'index',
};

async function qual(req: any) {
  const path = `${pwd}/${metodo[req.metodo]}`;
  // console.log(path, metodo[req.metodo], metodo);
  const fileExist = fs.existsSync(path) && require(`${path}`);

  console.log(fileExist);

  return fileExist;
}

export default qual;

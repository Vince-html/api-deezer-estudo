const fs = require('fs')

const pwd = './useCase/getTracks'

const metodo: Record<string, string> = {
  post: 'index'
}

async function qual (req: any) {
  const path = `${pwd}/${metodo[req.metodo]}`
  const fileExist = fs.existsSync(path) && require(`${path}`)

  return fileExist
}

export default qual

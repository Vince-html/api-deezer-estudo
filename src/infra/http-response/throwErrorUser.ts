const errorUser = (message: string, statusCode: number) => {
  return {
    error: message,
    statusCode
  }
}

export { errorUser }

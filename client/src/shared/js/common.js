const normalizeFormSubmitError = (someErrors) => {
  let normalErrors = {}

  someErrors &&
    someErrors.forEach((e) => {

      // backend controller layer errors
      if (e.msg && e.param) {
        normalErrors[e.param] = e.msg
      }

      // backend model/database layer errors
      if (e.message && e.path) {
        normalErrors[e.path] = e.message
      }
      if (e.path === 'isMasterFree') {
        normalErrors['onTime'] = e.message
      }
      
    })

  return normalErrors
}

export { normalizeFormSubmitError }

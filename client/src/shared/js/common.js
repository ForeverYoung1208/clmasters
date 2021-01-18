const normalizeFormSubmitError = (someErrors) => {
  let normalErrors = {}

  someErrors.forEach((e) => {
    if (e.msg && e.param) {
      normalErrors[e.param] = e.msg
    }

    if (e.message && e.path) {
      normalErrors[e.path] = e.message
    }
  })

  return normalErrors
}

export { normalizeFormSubmitError }

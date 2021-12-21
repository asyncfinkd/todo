export const generateHeader = (token: string, type: 'FORM' | 'JSON') => {
  return {
    'Content-type':
      type === 'JSON' ? 'application/json' : 'multipart/form-data',
    authorization: `Bearer ${token}`,
  }
}

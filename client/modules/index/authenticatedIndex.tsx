import { ApplicationContext } from 'context/application'
import React, { useContext } from 'react'

export default function AuthenticatedIndex() {
  const { access_token } = useContext(ApplicationContext)
  return (
    <>
      <p style={{ padding: 15, fontFamily: 'sans-serif' }}>
        Hello, {access_token?.name} {access_token?.lastName}
      </p>
    </>
  )
}

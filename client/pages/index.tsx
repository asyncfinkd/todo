import { useAuthProvider } from 'auth'
import AuthenticatedIndex from 'modules/index/authenticatedIndex'
import type { NextPage } from 'next'
import { Header } from 'ui/header'

const Home: NextPage = () => {
  const { access_token, auth } = useAuthProvider()

  if (auth.type === 'null') return null
  return (
    <>
      <Header />
      {auth.type === 'authenticated' ? (
        <>
          <AuthenticatedIndex />
        </>
      ) : (
        <h1>not logged</h1>
      )}
    </>
  )
}

export default Home

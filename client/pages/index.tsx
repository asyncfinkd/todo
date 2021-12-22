import { useAuthProvider } from 'auth'
import type { NextPage } from 'next'
import { Header } from 'ui/header'

const Home: NextPage = () => {
  const { access_token, auth } = useAuthProvider()

  if (auth.type === 'null') return null
  return (
    <>
      {console.log(auth)}
      <Header />
      {auth.type === 'authenticated' ? <h1>logged</h1> : <h1>not logged</h1>}
    </>
  )
}

export default Home

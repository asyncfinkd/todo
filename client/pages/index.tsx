import { useAuthProvider } from 'auth'
import type { NextPage } from 'next'
import { Header } from 'ui/header'

const Home: NextPage = () => {
  const { access_token } = useAuthProvider()

  return (
    <>
      {console.log(access_token)}
      <Header />
      {access_token?.logged ? <h1>logged</h1> : <h1>not logged</h1>}
    </>
  )
}

export default Home

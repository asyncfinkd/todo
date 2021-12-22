import { useAuthProvider } from 'auth'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { access_token } = useAuthProvider()

  return <>{access_token?.logged ? <h1>logged</h1> : <h1>not logged</h1>}</>
}

export default Home

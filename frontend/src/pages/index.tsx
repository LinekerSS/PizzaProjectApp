import { useContext, FormEvent, useState } from 'react';
import styles from '../../styles/home.module.scss'
import Head from 'next/head'
import logoImg from '../../public/logo.svg';
import Image from 'next/image';
import { Input } from '../components/ui/input/indes';
import { Button } from '../components/ui/button/indes';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext'; 

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [passaword, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e : FormEvent) {
    e.preventDefault();

    let data = {
      email,
      passaword
    }

    await signIn(data)
  }

  return (
   <>
    <Head>
      <title> Pizzaria do Dadá - faça seu login</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria" />

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input placeholder='Digite seu email' type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder='Digite sua senha' type="password" value={passaword} onChange={(e) => setPassword(e.target.value)}/>
          <Button type="submit" loading={false}>Acessar</Button>
        </form>
        <Link legacyBehavior href="/signup">
          <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
        </Link>
      </div>
    </div>
   </>
  )
}

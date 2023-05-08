import styles from '../../../styles/home.module.scss'
import Head from 'next/head'
import logoImg from '../../../public/logo.svg';
import Image from 'next/image';
import { Input } from '../../components/ui/input/indes';
import { Button } from '../../components/ui/button/indes';
import Link from 'next/link';

export default function Signup() {
  return (
   <>
    <Head>
      <title> Pizzaria do Dadá - faça seu cadastro</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo Pizzaria" />

      <div className={styles.login}>
        <h1>Criando sua conta</h1>
        <form>
          <Input placeholder='Digite seu nome' type="text"/>
          <Input placeholder='Digite seu email' type="text"/>
          <Input placeholder='Digite sua senha' type="password"/>
          <Button type="submit" loading={false}>Cadastrar</Button>
        </form>
        <Link legacyBehavior href="/">
          <a className={styles.text}>Já possui uma conta? Faça seu login</a>
        </Link>
      </div>
    </div>
   </>
  )
}

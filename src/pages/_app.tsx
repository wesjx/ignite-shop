import type { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
import { CartProvider as ShoppingCartProvider } from "use-shopping-cart";

import logoImg from '@/assets/logo.svg'
import { globalStyles } from "@/styles/global";
import { Container, Header } from "@/styles/pages/app";

import {BagDialog} from "../components/Cart";

globalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ShoppingCartProvider
    shouldPersist={true}
    cartMode="checkout-session"
    stripe={`${process.env.STRIPE_PUBLIC_KEY}`}
    currency="EUR"
  >
    <Container>
      <Header>
        <Link href={"/"}>
          <Image src={logoImg} alt="" />
        </Link>
        <BagDialog/>
      </Header>
      <Component {...pageProps} />
    </Container>

  </ShoppingCartProvider>
  )
}

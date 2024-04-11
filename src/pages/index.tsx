import 'keen-slider/keen-slider.min.css'

import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from "next/image"
import Link from 'next/link'
import { IoBagOutline } from 'react-icons/io5'
import Stripe from 'stripe'
import { useShoppingCart } from 'use-shopping-cart'
import { Product as ProductCart } from 'use-shopping-cart/core'

import { stripe } from '@/lib/stripe'
import { HomeContainer, Product } from "@/styles/pages/home"
import { priceFormatter } from '@/utils/formatters'

interface HomeProps {
  products: ProductCart[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      origin: "center",
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 640px)': {
        slides: {
          perView: 1,
          spacing: 15,
        },
      },
    }
  })

  const {addItem} = useShoppingCart()

  function handleAddItemToCart(e: React.MouseEvent<HTMLButtonElement>, product: ProductCart)  {
    e.preventDefault()
    addItem(product)
    console.log(product)
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className='keen-slider'>
        {products ? (
          products.map(product => {
            return (
              <Link  
              href={`/product/${product.sku}`}  
              key={product.sku}
              prefetch= {false}>
                <Product key={product.id} className='keen-slider__slide'>
                  <Image priority={true} src={product.imageUrl} alt={""} width={520} height={480} />

                  <footer>
                    <strong>
                      {product.name}
                    </strong>
                    <span>{priceFormatter.format(product.price)}</span>
                    <button onClick={(e) => handleAddItemToCart(e, product)}><IoBagOutline size={30} /></button>
                  </footer>
                </Product>
              </Link>
            )
          })
        ) : (
          <pre>Not found</pre>
        )}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {

    const price = product.default_price as Stripe.Price

    return {
      sku: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: (price.unit_amount ?? 0) / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 //2 hours
  };
}

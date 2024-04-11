import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Stripe from "stripe"
import { useShoppingCart } from "use-shopping-cart"
import { Product } from "use-shopping-cart/core"

import { stripe } from "@/lib/stripe"
import { ImageContainer, ProductDetails, ProductsContainer } from "@/styles/pages/product"
import { priceFormatter } from "@/utils/formatters"

interface ProductProps {
    product: Product
}

export default function Products({ product }: ProductProps) {

    const {addItem} = useShoppingCart()
    const [creatingCheckoutSession, setCreatingCheckoutSession] = useState(false)
    const { isFallback } = useRouter()

    if (isFallback) {
        return <p>Loading..</p>
    }

    return (
        <>
            <Head>
                <title>{product.name} | Ignite Shop</title>
            </Head>
            <ProductsContainer>
                <ImageContainer>
                    <Image src={product.imageUrl} width={520} height={480} alt='' />
                </ImageContainer>
                <ProductDetails>
                    <h1>{product.name}</h1>
                    <span>{priceFormatter.format(product.price)}</span>

                    <p>{product.description}</p>

                    <button disabled={creatingCheckoutSession} onClick={(e) => addItem(product)}>Add cart</button>
                </ProductDetails>
            </ProductsContainer>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            { params: { id: 'prod_Pnoql1Y66wQTmN' } }
        ],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    const productsId = params!.id;

    const product = await stripe.products.retrieve(productsId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price

    return {
        props: {
            product: {
                sku: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: (price.unit_amount ?? 0) / 100,
                description: product.description,
                defaultPriceId: price.id,
            }

        },
        revalidate: 60 * 60 * 1, //1 hour
    }
}

import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { ImageContainer, SuccessContainer } from "@/styles/pages/success";

interface SuccessProps {
    customerName: string
    productsImages: string[]
}

export default function Success({ customerName, productsImages }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Home | Ignite Shop</title>
                <meta name="robots" content="noindex" />
            </Head>
            <SuccessContainer>
                <h1>Success!</h1>
                <ImageContainer>
                    {productsImages.map((product, i) => (
                        <>
                            <div>
                                <Image key={i} src={product} width={120} height={110} alt={""} />
                            </div>
                        </>
                    ))}
                </ImageContainer>

                <p>
                    Uhuul! <strong>{customerName}</strong>, your products are on the way to your house.
                </p>

                <Link href="/">
                    Go Home
                </Link>
            </SuccessContainer>
        </>)
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const sessionId = String(query.session_id)

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'line_items.data.price.product']
    })

    const customerName = session.customer_details?.name;
    const productsImages = session.line_items?.data.map(item => {
        const product = item.price?.product as Stripe.Product;
        return product.images[0];
    })
    return {
        props: {
            customerName,
            productsImages
        }
    }
}

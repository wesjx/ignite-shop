import { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const { products } = req.body;
    console.log(products)

    if(req.method != 'POST') {
        return res.status(405).json({error: 'Method not allowed'})
    }
    
    if(!products) {
        return res.status(400).json({error: 'Price not found.'})
    }

    const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;    
    const cancelUrl = `${process.env.NEXT_URL}`
    
    const checkoutSessions = await stripe.checkout.sessions.create({
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'payment',
        line_items: products.map((product: { defaultPriceId: string; quantity: number; }) => ({
            price: product.defaultPriceId,
            quantity: product.quantity
        }))
    })

    return res.status(201).json({
        checkoutUrl: checkoutSessions.url,
    })
}
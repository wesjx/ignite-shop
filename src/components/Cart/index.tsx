import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';
import Image from 'next/image';
import { IoBagOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { useShoppingCart } from 'use-shopping-cart';

import { priceFormatter } from '@/utils/formatters';

import {
    BagButton,
    DialogContent,
    DialogOverlay,
    DialogPrice,
    DialogProduct,
    DialogTitle,
    IconButton,
    Quantity,
    Total
} from './style';


export function BagDialog() {

    const { cartDetails, cartCount, totalPrice, removeItem, decrementItem, clearCart } = useShoppingCart()

    if (!cartDetails) {
        return;
    }
    const cartItemsArray = Object.values(cartDetails)

    const isCartEmpty = cartItemsArray.length <= 0

    function handleItemRemove(e: React.MouseEvent<HTMLButtonElement>, product: string) {
        e.preventDefault()
        decrementItem(product)
    }

    function handleRemoveItem(e: React.MouseEvent<HTMLButtonElement>, product: string) {
        e.preventDefault()
        removeItem(product)
    }

    console.log(isCartEmpty)
    async function handlePayment(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            const response = await axios.post('/api/checkout', {
                products: cartItemsArray
            })

            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl

            clearCart()
        } catch (error) {
            alert('Aplication error')
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <BagButton>
                    <IoBagOutline size={30} />
                    <span>{cartCount}</span>
                </BagButton>
            </Dialog.Trigger>
            <Dialog.Portal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Shopping bag</DialogTitle>
                    {isCartEmpty ? 
                    <h2>Your shopping bag is empty.</h2>
                    :
                        Object.values(cartDetails).map((product) => (
                            <>
                                <DialogProduct key={product.id}>
                                    <Image src={product.imageUrl} width={100} height={100} alt='' />

                                    <section>
                                        <header>
                                            <h2>{product.name}</h2>
                                            <button onClick={(e) => handleRemoveItem(e, product.sku)}>
                                                <RxCross1 size={20} />
                                            </button>
                                        </header>
                                        <div>
                                            <p>{priceFormatter.format(product.price)}</p>
                                            <span>x{product.quantity}</span>
                                        </div>
                                        <button onClick={(e) => handleItemRemove(e, product.id)}>Remove</button>
                                    </section>
                                </DialogProduct>
                            </>
                        ))
                    }
                    <DialogPrice>
                        <Quantity>
                            <p>Quantity</p>
                            <span>
                                {cartCount} {cartCount === 1 ? 'item' : 'items'}
                            </span>
                        </Quantity>

                        <Total>
                            <p>Total</p>

                            <span>
                                {priceFormatter.format(totalPrice || 0)}
                            </span>
                        </Total>
                        <button
                            disabled={isCartEmpty}
                            onClick={(e) => handlePayment(e)
                            }>Finalize purchase</button>
                    </DialogPrice>
                    <Dialog.Close asChild>
                        <IconButton aria-label="Close">
                            <RxCross1 size={30} />
                        </IconButton>
                    </Dialog.Close>
                </DialogContent>
            </Dialog.Portal>
        </Dialog.Root>
    )
}


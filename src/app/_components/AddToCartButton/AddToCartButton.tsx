"use client"
import { MouseEvent, useContext, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { addToCart } from '../Products/products.actions'
import { cartContext } from '@/app/_context/CartDataProvider'
import type { CartResponse } from '@/app/interfaces'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type props = {
  className?: string,
  id: string,
  children?: string | React.ReactNode,
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
  ariaLabel?: string,
  onCartUpdated?: (data: CartResponse) => void
}

export default function AddToCartButton({ id, className, variant, children = "Button", ariaLabel, onCartUpdated }: props) {
  const { UpdateCartData } = useContext(cartContext)
  const [isPending, setIsPending] = useState(false)

  async function handleclick(e: MouseEvent) {
    e.preventDefault()
    if (isPending) return

    try {
      setIsPending(true)
      const res = await addToCart(id);

      if (typeof res?.numOfCartItems === "number") {
        UpdateCartData(res.numOfCartItems)
        onCartUpdated?.(res)
        toast.success("Product added to cart!", {
          description: "You can view your items in the shopping cart.",
          duration: 2000,
        });
      } else {
        toast.error("Failed to add product", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Something went wrong while adding the product.",
      });
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      aria-label={ariaLabel ?? (typeof children === 'string' ? children : 'Add to cart')}
      disabled={isPending}
      variant={variant}
      className={`${className ?? ""} cursor-pointer flex items-center justify-center gap-2`}
      onClick={handleclick}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin font-black" />
      ) : (
        children
      )}
    </Button>
  )
}
import { getCart } from "@/ApiServices/cart.servicies";
import CartContent from "./CartContent";

export default async function CartPage() {

  const cartData = await getCart()

  if(!cartData){
    return <h1>nothing here</h1>
  }
  return <CartContent initialCartData={cartData} />;
}

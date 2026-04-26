"use client";

import { useState, useTransition, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Home, 
  ShoppingBag, 
  Wallet, 
  Info,
  User,
  Mail,
  MapPin,
  Phone,
  FileText,
  Hash
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { itemsCart } from "@/app/interfaces";
import FreeShippingBar from "../FreeShippingBar/FreeShippingBar";
import { useSession } from "next-auth/react";
import { createCashOrder, createOnlineOrder } from "@/ApiServices/order.services";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cartContext } from "@/app/_context/CartDataProvider";

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(3, "City is required"),
  details: z.string().min(5, "Address details are required"),
  postalCode: z.string().min(5, "Valid postal code is required"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export default function CheckoutForm({ cartId, totalAmount, products }: { cartId: string; totalAmount: number; products: itemsCart[] }) {
  const [isPending, startTransition] = useTransition();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const { data: session } = useSession();
  const { UpdateCartData } = useContext(cartContext);
  const router = useRouter();

  const {
    control,
    handleSubmit,
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: session?.user?.name || "",
      email: session?.user?.email || "",
      phone: "",
      city: "",
      details: "",
      postalCode: "",
    }
  });

  const onSubmit = async (data: CheckoutValues) => {
    if (!session?.user?.userToken) {
      toast.error("Please sign in to place an order");
      return;
    }

    startTransition(async () => {
      const shippingAddress = {
        details: data.details,
        phone: data.phone,
        city: data.city,
        postalCode: data.postalCode,
      };

      if (paymentMethod === "cash") {
        const response = await createCashOrder(cartId, shippingAddress, session.user.userToken);
        if (response && response.status === "success") {
          UpdateCartData(0); // Reset cart count
          toast.success("Order Placed Successfully!", {
            description: "Your cash order has been received.",
          });
          router.push("/allorders");
        } else {
          toast.error("Failed to place order", {
            description: response?.message || "Something went wrong.",
          });
        }
      } else {
        const response = await createOnlineOrder(cartId, shippingAddress, session.user.userToken);
        if (response && response.status === "success" && response.session?.url) {
          UpdateCartData(0); // Reset cart count
          toast.info("Redirecting to payment gateway...");
          window.location.href = response.session.url;
        } else {
          toast.error("Failed to initiate payment", {
            description: response?.message || "Something went wrong.",
          });
        }
      }
    });
  };

  const formatEgp = (value: number) => new Intl.NumberFormat("en-US").format(value) + " EGP";

  const shippingCost = totalAmount >= 500 || totalAmount === 0 ? 0 : 50;
  const finalTotal = totalAmount + shippingCost;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
      {/* 🚀 LEFT COLUMN: ADDRESS & PAYMENT */}
      <div className="space-y-8">
        
        {/* 🏠 SHIPPING SECTION */}
        <section className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="bg-green-600 px-6 py-4 flex items-center gap-3 text-white">
            <Home size={22} strokeWidth={2.5} />
            <div>
              <h2 className="text-xl font-bold">Shipping Address</h2>
              <p className="text-xs text-green-100 font-medium">Where should we deliver your order?</p>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Blue Alert */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-700">
              <Info size={18} className="shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Delivery Information</p>
                <p className="opacity-80">Please ensure your address is accurate for smooth delivery</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="fullName">
                        <User size={14} className="text-gray-400" />
                        Full Name*
                      </FieldLabel>
                      <Input
                        placeholder="John Doe"
                        className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-11 rounded-xl bg-gray-50/50 border-gray-200"
                        {...field}
                        id="fullName"
                        aria-invalid={fieldState.invalid}
                        autoComplete="name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="email">
                        <Mail size={14} className="text-gray-400" />
                        Email Address*
                      </FieldLabel>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-11 rounded-xl bg-gray-50/50 border-gray-200"
                        {...field}
                        id="email"
                        aria-invalid={fieldState.invalid}
                        autoComplete="email"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="city">
                        <MapPin size={14} className="text-gray-400" />
                        City*
                      </FieldLabel>
                      <Input
                        placeholder="e.g. Cairo"
                        className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-11 rounded-xl bg-gray-50/50 border-gray-200"
                        {...field}
                        id="city"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Postal Code */}
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="postalCode">
                        <Hash size={14} className="text-gray-400" />
                        Postal Code*
                      </FieldLabel>
                      <Input
                        placeholder="e.g. 12345"
                        className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-11 rounded-xl bg-gray-50/50 border-gray-200"
                        {...field}
                        id="postalCode"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* Phone Number */}
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="phone">
                      <Phone size={14} className="text-gray-400" />
                      Phone Number*
                    </FieldLabel>
                    <div className="relative group">
                       <Input 
                        placeholder="01xxxxxxxxx" 
                        className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-11 rounded-xl bg-gray-50/50 border-gray-200 w-full"
                        {...field}
                        id="phone"
                        aria-invalid={fieldState.invalid}
                        type="tel"
                      />
                       <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold uppercase tracking-wider hidden sm:block">Egyptian numbers only</span>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Street Address */}
              <Controller
                name="details"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-bold flex items-center gap-2" htmlFor="details">
                      <FileText size={14} className="text-gray-400" />
                      Street Address*
                    </FieldLabel>
                    <Input
                      placeholder="Street name, building number, floor, apartment..."
                      className="focus-visible:ring-emerald-200 placeholder:text-[14px] focus-visible:ring-1 h-20 py-3 rounded-xl bg-gray-50/50 border-gray-200"
                      {...field}
                      id="details"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>
        </section>

        {/* 💳 PAYMENT SECTION */}
        <section className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden bg-white">
          <div className="bg-green-600 px-6 py-4 flex items-center gap-3 text-white">
            <Wallet size={22} strokeWidth={2.5} />
            <div>
              <h2 className="text-xl font-bold">Payment Method</h2>
              <p className="text-xs text-green-100 font-medium">Choose how you'd like to pay</p>
            </div>
          </div>
          
          <div className="p-8 space-y-4">
            <div
              className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
                paymentMethod === "cash" ? "border-green-600 bg-green-50/50 ring-4 ring-green-100" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/10"
              }`}
              onClick={() => setPaymentMethod("cash")}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${paymentMethod === "cash" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Cash on Delivery</h3>
                  <p className="text-sm text-gray-500">Pay when your order arrives at your doorstep</p>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "cash" ? "border-green-600 bg-green-600" : "border-gray-300"}`}>
                {paymentMethod === "cash" && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </div>

            <div
              className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
                paymentMethod === "card" ? "border-green-600 bg-green-50/50 ring-4 ring-green-100" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/10"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl transition-colors ${paymentMethod === "card" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-500"}`}>
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Pay Online</h3>
                  <div className="text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
                    Secure payment with Credit/Debit Card via Stripe
                    <div className="flex gap-1 mt-1">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5 opacity-60" />
                       <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3.5 opacity-60" />
                       <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-2.5 opacity-60" />
                    </div>
                  </div>
                </div>
              </div>
               <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === "card" ? "border-green-600 bg-green-600" : "border-gray-300"}`}>
                {paymentMethod === "card" && <CheckCircle2 size={14} className="text-white" />}
              </div>
            </div>

            <div className="bg-green-50/30 border border-green-100 rounded-xl p-3 flex items-center gap-3 mt-6">
                <ShieldCheck size={18} className="text-green-600" />
                <div className="text-xs">
                   <p className="font-bold text-gray-800">Secure & Encrypted</p>
                   <p className="text-gray-500">Your payment info is protected with 256-bit SSL encryption</p>
                </div>
            </div>
          </div>
        </section>
      </div>

      {/* 💰 RIGHT COLUMN: SUMMARY */}
      <aside className="space-y-6 lg:sticky lg:top-8 h-fit">
        <Card className="rounded-3xl shadow-2xl shadow-green-900/5 border-gray-100 overflow-hidden bg-white">
          <div className="bg-green-600 px-6 py-5 flex items-center gap-3 text-white">
            <ShoppingBag size={22} strokeWidth={2.5} />
            <div>
              <h2 className="text-xl font-bold">Order Summary</h2>
              <p className="text-xs text-green-100 font-medium">{products.length} {products.length === 1 ? 'Item' : 'Items'}</p>
            </div>
          </div>
          
          <CardContent className="p-6">
            <FreeShippingBar total={totalAmount} />
            <div className="max-h-[300px] overflow-y-auto pr-2 my-6 scrollbar-thin scrollbar-thumb-gray-200">
              {products.map((item) => (
                <div key={item._id} className="flex gap-4 py-4 border-b border-gray-50 last:border-0 items-center">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                    <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate uppercase">{item.product.title}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.count} × {formatEgp(item.price)}</p>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {formatEgp(item.price * item.count)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <span>Subtotal</span>
                <span>{formatEgp(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-gray-600">
                <div className="flex items-center gap-1.5">
                   <Truck size={14} />
                   <span>Shipping</span>
                </div>
                <span className={shippingCost === 0 ? "text-green-600" : "text-gray-900"}>
                  {shippingCost === 0 ? "FREE" : formatEgp(shippingCost)}
                </span>
              </div>
              <Separator className="bg-gray-100" />
              <div className="flex justify-between items-center py-2">
                <span className="text-lg font-black text-gray-900 uppercase">Total</span>
                <span className="text-2xl font-black text-green-600">{formatEgp(finalTotal)}</span>
              </div>
            </div>

            <Button
              className="w-full h-14 text-lg font-black mt-8 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-xl shadow-green-600/20 uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                   <ShieldCheck size={22} />
                   Place Order
                </>
              )}
            </Button>
            
            <div className="grid grid-cols-3 gap-2 mt-8 py-4 border-t border-gray-100">
               <div className="flex flex-col items-center gap-1.5">
                  <div className="p-1.5 bg-green-50 text-green-600 rounded-full"><ShieldCheck size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Secure</span>
               </div>
               <div className="flex flex-col items-center gap-1.5">
                  <div className="p-1.5 bg-green-50 text-green-600 rounded-full"><Truck size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase text-center">Fast Delivery</span>
               </div>
               <div className="flex flex-col items-center gap-1.5">
                  <div className="p-1.5 bg-green-50 text-green-600 rounded-full"><ShoppingBag size={14} /></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase text-center">Easy Returns</span>
               </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

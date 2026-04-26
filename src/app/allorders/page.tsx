import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserOrders } from "@/ApiServices/order.services";
import Link from "next/link";
import { 
  Box, 
  ChevronDown, 
  CalendarDays, 
  MapPin, 
  ShoppingBag, 
  Clock, 
  Hash, 
  Receipt,
  CheckCircle2,
  AlertCircle,
  Truck
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function AllOrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold">Please sign in to view your orders</h1>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    );
  }

  const orders = await getUserOrders(session.user.id);

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">No orders found</h1>
        <p className="text-gray-500 mb-8">You haven't placed any orders yet. Start shopping to see them here!</p>
        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 rounded-xl px-10">
          <Link href="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-10">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link className="hover:text-green-600 transition" href="/">Home</Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25 text-white">
              <Box size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-500 text-sm mt-0.5">Track and manage your {orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
            </div>
          </div>
          <Button asChild variant="ghost" className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm">
            <Link href="/">
              <ShoppingBag size={14} className="mr-1" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order: any) => (
          <div 
            key={order.id} 
            className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-md"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`order-${order.id}`} className="border-none">
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Primary Product Image Thumbnail (First Item) */}
                    <div className="relative shrink-0 mx-auto lg:mx-0">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden flex items-center justify-center">
                        <img 
                          alt={order.cartItems[0]?.product.title} 
                          className="max-w-full max-h-full object-contain" 
                          src={order.cartItems[0]?.product.imageCover} 
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                             <Badge variant="secondary" className={`${
                               order.isDelivered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                             } rounded-lg border-none px-2.5 py-1 flex items-center gap-1.5`}>
                               {order.isDelivered ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                               <span className="text-xs font-bold">{order.isDelivered ? "Delivered" : "Processing"}</span>
                             </Badge>
                             <Badge variant="outline" className="rounded-lg border-gray-200 text-gray-500 flex items-center gap-1">
                               <Hash size={10} />
                               <span className="text-xs">{order.id}</span>
                             </Badge>
                          </div>
                          <h3 className="font-bold text-gray-900 text-lg">
                            Order {order.isPaid ? 'Paid' : 'Unpaid'} via {order.paymentMethodType === 'card' ? 'Online Card' : 'Cash'}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-black text-gray-900">{order.totalOrderPrice}</span>
                          <span className="text-sm font-bold text-gray-400 ml-1">EGP</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b border-gray-50">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="w-4 h-4 text-gray-400" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200 hidden sm:block"></span>
                        <span className="flex items-center gap-1.5">
                          <Box className="w-4 h-4 text-gray-400" />
                          {order.cartItems.length} {order.cartItems.length === 1 ? 'item' : 'items'}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200 hidden sm:block"></span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {order.shippingAddress.city}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                         <div className="flex -space-x-4 overflow-hidden">
                           {order.cartItems.slice(0, 4).map((item: any, i: number) => (
                             <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-white border border-gray-100 overflow-hidden">
                               <img className="h-full w-full object-cover" src={item.product.imageCover} alt="" />
                             </div>
                           ))}
                           {order.cartItems.length > 4 && (
                             <div className="flex items-center justify-center h-10 w-10 rounded-full ring-2 ring-white bg-gray-100 text-[10px] font-bold text-gray-500 border border-gray-100">
                               +{order.cartItems.length - 4}
                             </div>
                           )}
                         </div>
                         <AccordionTrigger className="hover:no-underline py-2 bg-green-500 cursor-pointer decoration-2 px-3 text-white ">
                            Details
                         </AccordionTrigger>
                      </div>
                    </div>
                  </div>
                </div>

                <AccordionContent className="bg-gray-50/50 border-t border-gray-100 p-0">
                  <div className="p-5 sm:p-8 space-y-8">
                    {/* Items Section */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                          <Receipt size={16} />
                        </div>
                        Order Items
                      </h4>
                      <div className="grid gap-3">
                        {order.cartItems.map((item: any) => (
                          <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm transition-transform hover:shadow-md">
                            <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0 border border-gray-50">
                              <img 
                                alt={item.product.title} 
                                className="w-full h-full object-contain" 
                                src={item.product.imageCover} 
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-gray-900 truncate uppercase text-sm">{item.product.title}</p>
                              <p className="text-xs text-gray-500 font-bold mt-1">
                                <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md mr-1">{item.count}</span> 
                                × {item.price} EGP
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-lg font-black text-gray-900">{item.price * item.count}</p>
                              <p className="text-[10px] font-bold text-gray-400 uppercase">EGP</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Shipping Info */}
                      <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <h4 className="font-bold text-sm flex items-center gap-2 mb-4 text-blue-600">
                          <MapPin size={16} />
                          Delivery Address
                        </h4>
                        <div className="space-y-2">
                          <p className="font-black text-gray-900 uppercase text-xs tracking-wider">{order.shippingAddress.city}</p>
                          <p className="text-sm text-gray-500 leading-relaxed font-medium">{order.shippingAddress.details}</p>
                          <div className="flex items-center gap-2 pt-2 text-xs font-bold text-gray-400 group cursor-default">
                             <div className="w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                <Truck size={12} />
                             </div>
                             {order.shippingAddress.phone}
                          </div>
                        </div>
                      </div>

                      {/* Payment Summary */}
                      <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-10 text-amber-500 group-hover:rotate-12 transition-transform">
                          <Receipt size={64} />
                        </div>
                        <h4 className="font-bold text-sm flex items-center gap-2 mb-4 text-amber-700">
                          <Clock size={16} />
                          Order Summary
                        </h4>
                        <div className="space-y-3 text-sm relative z-10">
                          <div className="flex justify-between text-gray-500 font-bold">
                            <span>Subtotal</span>
                            <span className="text-gray-900">{(order.totalOrderPrice - (order.shippingPrice || 0)).toLocaleString()} EGP</span>
                          </div>
                          <div className="flex justify-between text-gray-500 font-bold">
                            <span>Shipping</span>
                            <span className={order.shippingPrice > 0 ? "text-gray-900" : "text-green-600"}>
                              {order.shippingPrice > 0 ? `${order.shippingPrice} EGP` : "FREE"}
                            </span>
                          </div>
                          <div className="h-px bg-amber-100 my-2" />
                          <div className="flex justify-between items-center pt-1">
                            <span className="font-black text-gray-900 uppercase">Total Paid</span>
                            <span className="text-2xl font-black text-gray-900">{order.totalOrderPrice} <span className="text-xs font-bold text-gray-400">EGP</span></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

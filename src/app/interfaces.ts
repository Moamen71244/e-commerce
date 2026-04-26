export interface product{
    sold:number,
    images: [
      string
    ]
    // subcategory: [ [Object] ],
    // ratingsQuantity: 0,
    _id: string,
    title: string,
    // slug: 'nsw-everyday-essentials-no-show-socks-(pack-of-3)-whiteblack',
    description: string,
    quantity: number,
    price: number,
    priceAfterDiscount: number,
    imageCover: string,
    category: {
      _id: string,
      name:string,
      slug:string,
      image: string
    },
    brand: {
      _id: string,
      name:string,
      slug:string,
      // image :string//ecommerce.routemisr.com/Route-Academy-brands/1678285881943.png'
    },
    // ratingsAverage: 0,
    // createdAt: '2023-04-02T00:40:39.312Z',
    // updatedAt: '2026-03-05T19:29:48.938Z',
    id: string
  
  }
  
  export interface CategoryType {
    _id: string,
    name: string,
    slug: string,
    image: string,
    createdAt:  string,
    updatedAt:  string
  }

  export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CartResponse {
numOfCartItems: number,
// cartId: string,
data: {
    _id: string,
    cartOwner: string ,
    products: itemsCart[],
    // createdAt: string,
    // updatedAt: string,
    // __v: number,
    totalCartPrice: number
}
  }
  
  
  export interface itemsCart {
    count: number,
    _id: string,
    product: product
    price: number
  }

  export interface Review {
    _id: string;
    rating: number;
    review: string;
    product: string;
    user: {
      _id: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  export interface OrderResponse {
    status: string;
    message: string;
    user?: {
      id: string;
      name: string;
      email: string;
    };
    pricing?: {
      cartPrice: number;
      taxPrice: number;
      shippingPrice: number;
      totalOrderPrice: number;
    };
    data: OrderData;
  }

  export interface OrderData {
    shippingAddress: {
      details: string;
      phone: string;
      city: string;
      postalCode?: string;
    };
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: "cash" | "card";
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone?: string;
    };
    cartItems: OrderItem[];
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
  }

  export interface OrderItem {
    count: number;
    _id: string;
    product: product;
    price: number;
  }
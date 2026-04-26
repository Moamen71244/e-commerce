import { Truck, CheckCircle2 } from "lucide-react";

interface FreeShippingBarProps {
  total: number;
}

export default function FreeShippingBar({ total }: FreeShippingBarProps) {
  const threshold = 500;
  // Handle edge cases: total = 0, prevent negative values
  const safeTotal = Math.max(0, total);
  
  // Calculate progress ensuring it's between 0 and 100
  const progress = Math.min((safeTotal / threshold) * 100, 100);
  
  // Calculate remaining amount
  const remaining = Math.max(0, threshold - safeTotal);
  
  // Boolean to check if free shipping is achieved
  const isFree = safeTotal >= threshold && safeTotal > 0;

  if (total === 0) {
    return null; // hide if cart is completely empty
  }

  return (
    <div className="w-full space-y-3 p-4 rounded-xl border border-green-100 bg-green-50/50">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full transition-colors duration-500 ${isFree ? 'bg-green-600 text-white shadow-md shadow-green-200' : 'bg-green-100 text-green-600'}`}>
          {isFree ? <CheckCircle2 size={18} /> : <Truck size={18} />}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">
            {isFree ? "🎉 You got FREE shipping!" : `Add ${remaining.toLocaleString("en-US", { maximumFractionDigits: 2 })} EGP to get FREE shipping`}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {isFree ? "Your order qualifies for free delivery." : "Almost there! Add more items to your cart."}
          </p>
        </div>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-200/80">
        <div
          className="absolute left-0 top-0 h-full bg-green-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

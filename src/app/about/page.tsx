import Image from "next/image";
import { ShoppingBag, Truck, ShieldCheck, Heart, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us - FreshCart",
  description: "Learn more about FreshCart's mission to provide the best shopping experience with top quality products.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-green-800 via-emerald-700 to-green-900 text-white">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-white opacity-5 mix-blend-overlay rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-teal-500 opacity-10 mix-blend-overlay rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 py-24 sm:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <Sparkles className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium tracking-wide">Welcome to FreshCart</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-white to-green-200 leading-tight">
              Redefining Commerce for the Modern World
            </h1>
            <p className="text-lg sm:text-xl text-green-50/90 leading-relaxed max-w-xl font-light">
              FreshCart started with a simple idea: bringing exceptional quality products directly to you with uncompromising service and sustainable practices.
            </p>
          </div>
          
          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-linear-to-r from-teal-500 to-green-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-4/3 bg-green-950/50">
              <Image 
                src="/images/about.png" 
                alt="Modern FreshCart warehouse" 
                fill 
                className="object-cover transform group-hover:scale-105 transition duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Happy Customers", value: "100k+" },
            { label: "Premium Products", value: "5,000+" },
            { label: "Countries Served", value: "30+" },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-green-100/50 dark:shadow-none p-8 text-center ring-1 ring-gray-100 dark:ring-zinc-800 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-600 mb-2">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Our Core Values
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything we do at FreshCart is guided by these principles to ensure you get the best possible experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShoppingBag className="w-8 h-8 text-green-500" />,
              title: "Exceptional Quality",
              description: "We handpick every item to ensure it meets our rigorous standards for quality and durability."
            },
            {
              icon: <Truck className="w-8 h-8 text-teal-500" />,
              title: "Lightning Fast",
              description: "Our next-generation logistics network ensures your orders arrive faster than ever."
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
              title: "Secure Shopping",
              description: "State-of-the-art encryption guarantees your data and transactions are always protected."
            },
            {
              icon: <Heart className="w-8 h-8 text-lime-500" />,
              title: "Customer First",
              description: "Our award-winning support team is available 24/7 to solve any problem, big or small."
            }
          ].map((value, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-white dark:bg-zinc-900 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 ring-1 ring-gray-100 dark:ring-zinc-800">
              <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

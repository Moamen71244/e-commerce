"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { loginAction } from "./login.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginshcema } from "./login.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginObj } from "./login.types";
import { signIn } from "next-auth/react";

type regObj ={
  name:string,
  email:string,
  password:string,
  rePassword:string,
  phone:number,
}


export default function LoginForm() {
const router  = useRouter()
const [showPassword, setShowPassword] = useState(false)
const {handleSubmit,control} = useForm<loginObj>({
    defaultValues:{
      email:"",
      password:"",
  },
    resolver : zodResolver(loginshcema) 
});
async function mySubmit(data:loginObj){
  
  // const response = await loginAction(data);
  const response = await signIn("credentials",{redirect:false,...data})
  if (response?.ok) {
    toast.success("Loged successfuly.",{
      duration:3000,
      position:"top-left",
      className:"text-green-400!",
      })
      setTimeout(() => {
        router.push("/")
      }, 3000);
  } else {
    toast.error("Account Not Exist.",{
      duration:3000,
      position:"top-left",
      className:"text-red-400!"
    })
  }
  
}
  return (
    <div className="space-y-7">
      
      {/* SOCIAL */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className=" border-gray-200 p-5 flex items-center text-[16px] font-semibold  cursor-pointer justify-center gap-2 hover:bg-gray-50 transition"
        >
          <svg
            className="w-6! h-6!"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              d="M17.625 8.18125C17.625 12.6031 14.5969 15.75 10.125 15.75C5.8375 15.75 2.375 12.2875 2.375 8C2.375 3.7125 5.8375 0.25 10.125 0.25C12.2125 0.25 13.9688 1.01562 15.3219 2.27813L13.2125 4.30625C10.4531 1.64375 5.32188 3.64375 5.32188 8C5.32188 10.7031 7.48125 12.8938 10.125 12.8938C13.1938 12.8938 14.3438 10.6938 14.525 9.55313H10.125V6.8875H17.5031C17.575 7.28437 17.625 7.66562 17.625 8.18125Z"
              fill="#E7000B"
            />
          </svg>
          Continue with Google
        </Button>
        <Button
          variant="outline"
          className=" border-gray-200 p-5 flex items-center text-[16px] font-semibold  cursor-pointer justify-center gap-2 hover:bg-gray-50 transition"
        >
          <svg 
          className="w-6! h-6!"
           viewBox="0 0 20 16" fill="none">
            <path
              d="M18 8C18 3.58125 14.4187 0 10 0C5.58125 0 2 3.58125 2 8C2 11.75 4.58437 14.9 8.06875 15.7656V10.4438H6.41875V8H8.06875V6.94688C8.06875 4.225 9.3 2.9625 11.975 2.9625C12.4813 2.9625 13.3562 3.0625 13.7156 3.1625V5.375C13.5281 5.35625 13.2 5.34375 12.7906 5.34375C11.4781 5.34375 10.9719 5.84062 10.9719 7.13125V8H13.5844L13.1344 10.4438H10.9688V15.9406C14.9312 15.4625 18 12.0906 18 8Z"
              fill="#155DFC"
            />
          </svg>
        Continue with Facebook
        </Button>
      </div>

      {/* DIVIDER */}
      <div className="relative text-center text-gray-500 text-sm font-medium">
        <span className="px-3 bg-white relative z-10">OR CONTINUE WITH EMAIL</span>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
      </div>
      
<form id="form-rhf-demo" className="space-y-5" onSubmit={handleSubmit(mySubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="email">
                   email*
                  </FieldLabel>
                  <Input
                    placeholder="Enter your Email"
                    className="focus-visible:ring-emerald-200 placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (

                <div className="w-full space-y-2">
                <Label htmlFor="pass" className="text-lg capitalize">Password</Label>
                <div className="relative">
                  <Input
                    placeholder="create a strong password"
                    className="focus-visible:ring-emerald-200 w-full placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="pass"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    className="absolute cursor-pointer top-0 right-0 h-full px-6  hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    size="icon"
                    type="button"
                    variant="ghost"
                  >
                    {showPassword ? (
                      <EyeOff className="text-muted-foreground" />
                    ) : (
                      <Eye className="text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

                // <Field data-invalid={fieldState.invalid}>
                //   <FieldLabel className="text-lg capitalize" htmlFor="pass">
                //    Password*
                //   </FieldLabel>
              //   <Input
                  
              //   className="bg-background"
              //   id="password-toggle"
              //   placeholder="Enter your password"
               
              // />
      
                //   {fieldState.invalid && (
                //     <FieldError errors={[fieldState.error]} />
                //   )}
                // </Field>
            
          )}
            />

          
<Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Keep me signed in</Label>
      </Field>
      
        
               {/* BUTTON */}
      <Button type="submit" className="w-full  py-5 text-lg text-white font-bold cursor-pointer mt-10 bg-green-600 flex items-center hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-md">
         Sign In
    
      </Button>
        
        </form>
      
      
      
      
      
      
      

                     

      

    </div>
  );
}
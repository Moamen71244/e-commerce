"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { regObj } from "./regester.types";
import { Regshcema } from "./regester.schemas";
import { regesterAction } from "./regester.actions";
import { toast } from "sonner"
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router  = useRouter()
const {handleSubmit,control} = useForm<regObj>(

   {
    defaultValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    }
    ,
    resolver : zodResolver(Regshcema) }
  
);
async function mySubmit(data:regObj){
  
  const response = await regesterAction(data);
  if (response) {
    toast.success("Account created successfuly.",{
      duration:3000,
      position:"top-left",
      className:"text-green-400!",
      })
      setTimeout(() => {
        router.push("/signin")
      }, 3000);
      console.log();
      
  } else {
    toast.error("Account Already Exist.",{
      duration:3000,
      position:"top-left",
      className:"text-red-400!"
    })
  }
  
}
  return (
    <div className="space-y-7">
      
      {/* SOCIAL */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="w-1/2 border-gray-200 p-5 flex items-center text-[16px] font-semibold  cursor-pointer justify-center gap-2 hover:bg-gray-50 transition"
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
          Google
        </Button>

        <Button
          variant="outline"
          className="w-1/2 border-gray-200 p-5 flex items-center text-[16px] font-semibold  cursor-pointer justify-center gap-2 hover:bg-gray-50 transition"
        >
          <svg 
          className="w-6! h-6!"
           viewBox="0 0 20 16" fill="none">
            <path
              d="M18 8C18 3.58125 14.4187 0 10 0C5.58125 0 2 3.58125 2 8C2 11.75 4.58437 14.9 8.06875 15.7656V10.4438H6.41875V8H8.06875V6.94688C8.06875 4.225 9.3 2.9625 11.975 2.9625C12.4813 2.9625 13.3562 3.0625 13.7156 3.1625V5.375C13.5281 5.35625 13.2 5.34375 12.7906 5.34375C11.4781 5.34375 10.9719 5.84062 10.9719 7.13125V8H13.5844L13.1344 10.4438H10.9688V15.9406C14.9312 15.4625 18 12.0906 18 8Z"
              fill="#155DFC"
            />
          </svg>
          Facebook
        </Button>
      </div>

      {/* DIVIDER */}
      <div className="relative text-center text-gray-500 text-sm font-medium">
        <span className="px-3 bg-white relative z-10">or</span>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
      </div>
<form id="form-rhf-demo" className="space-y-5" onSubmit={handleSubmit(mySubmit)}>  
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="name">
                   Name*
                  </FieldLabel>
                  <Input

                    placeholder="moamen"
                    className="focus-visible:ring-emerald-200 placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="name"
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
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="email">
                   email*
                  </FieldLabel>
                  <Input
                    placeholder="moamen@gmail.com"
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
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="pass">
                   Password*
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder="create a strong password"
                    className="focus-visible:ring-emerald-200 placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="pass"
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
            
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="repass">
                  Confirm Password*
                  </FieldLabel>
                  <Input
                  type="password"
                    placeholder="confirm your password"
                    className="focus-visible:ring-emerald-200 placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="repass"
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
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-lg capitalize" htmlFor="Phone">
                  Phone Number*
                  </FieldLabel>
                  <Input
                  type="tel"
                    placeholder="01069594232"
                    className="focus-visible:ring-emerald-200 placeholder:text-[16px] focus-visible:ring-1 h-11"
                    {...field}
                    id="Phone"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

<Field orientation="horizontal">
        <Checkbox id="terms-checkbox" name="terms-checkbox" />
        <Label htmlFor="terms-checkbox">Accept terms and conditions</Label>
</Field>
      
        
               {/* BUTTON */}
      <Button type="submit" className="w-full mt-2 py-5 text-lg text-white font-medium bg-green-600 flex items-center hover:bg-green-700 transition-all duration-300 shadow-sm hover:shadow-md">


<svg width={19} height={16} viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2.75 3.75C2.75 2.75544 3.14509 1.80161 3.84835 1.09835C4.55161 0.395088 5.50544 0 6.5 0C7.49456 0 8.44839 0.395088 9.15165 1.09835C9.85491 1.80161 10.25 2.75544 10.25 3.75C10.25 4.74456 9.85491 5.69839 9.15165 6.40165C8.44839 7.10491 7.49456 7.5 6.5 7.5C5.50544 7.5 4.55161 7.10491 3.84835 6.40165C3.14509 5.69839 2.75 4.74456 2.75 3.75ZM0 14.8219C0 11.7437 2.49375 9.25 5.57188 9.25H7.42813C10.5063 9.25 13 11.7437 13 14.8219C13 15.3344 12.5844 15.75 12.0719 15.75H0.928125C0.415625 15.75 0 15.3344 0 14.8219ZM15.5 2.75C15.9156 2.75 16.25 3.08437 16.25 3.5V5H17.75C18.1656 5 18.5 5.33437 18.5 5.75C18.5 6.16563 18.1656 6.5 17.75 6.5H16.25V8C16.25 8.41562 15.9156 8.75 15.5 8.75C15.0844 8.75 14.75 8.41562 14.75 8V6.5H13.25C12.8344 6.5 12.5 6.16563 12.5 5.75C12.5 5.33437 12.8344 5 13.25 5H14.75V3.5C14.75 3.08437 15.0844 2.75 15.5 2.75Z" fill="white" />
</svg>

         <p className="mx-">Create My Account</p>
      </Button>
        
        </form>
      
      
      
      
      
      
      

                     

      

    </div>
  );
}
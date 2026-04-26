import  * as zod from "zod";
export const Regshcema = zod.object({
    name:zod.string("Name must be as string!").nonempty("Name is requierd").min(3,"Name must be at least 3 characters ").max(15,"Name must be at most 15 characters "),
    email:zod.email("email is not in format ").nonempty("Email is requierd"),
    password:zod.string().nonempty("password is required").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
    rePassword:zod.string().nonempty("repassword is required").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
    phone:zod.string().nonempty("Phone is required").regex(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/,"Must be eg number"),
  }).refine(  function(obj){
    return obj.password === obj.rePassword
  } , {error : "password and repassword are inmatch " ,path: ['password']} )
  
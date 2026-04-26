import  * as zod from "zod";
export const loginshcema = zod.object({
    email:zod.email("email is not in format ").nonempty("Email is requierd"),
    password:zod.string().nonempty("password is required").regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"Minimum eight characters, at least one letter, one number and one special character"),
  }) 
  
import  * as zod from "zod";
import { loginshcema } from "./login.schemas";
export type loginObj = zod.infer<typeof loginshcema>

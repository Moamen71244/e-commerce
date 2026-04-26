import  * as zod from "zod";
import { Regshcema } from "./regester.schemas";
export type regObj = zod.infer<typeof Regshcema>

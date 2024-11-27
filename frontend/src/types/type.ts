import z from "zod";
import { ProductSchema } from "../schema/productSchema";
import { CartSchema } from "../schema/productSchema";
import { UserSchema } from "../schema/userSchema";


export type ProductType = z.infer<typeof ProductSchema>;
export type CartType = z.infer<typeof CartSchema>;
export type UserType = z.infer<typeof UserSchema>;

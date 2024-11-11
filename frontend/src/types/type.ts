import z from "zod";
import { ProductSchema } from "../schema/productSchema";
import { CartSchema } from "../schema/productSchema";

export type ProductType = z.infer<typeof ProductSchema>;
export type CartType = z.infer<typeof CartSchema>;

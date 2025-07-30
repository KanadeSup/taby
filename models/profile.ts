import { Entity } from "dexie";
import AppDB from "@/lib/AppDB";

export default class Profile extends Entity<AppDB> {
   id!: number;
   name!: string;
   isDefault!: 1 | 0;
}
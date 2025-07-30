import { Entity } from "dexie";
import AppDB from "@/lib/AppDB";

export default class Mindspace extends Entity<AppDB> {
   id!: number;
   name!: string;
   icon!: string;
   profileId!: number;
}

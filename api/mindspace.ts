import { db } from "@/lib/db";

export function createMindspace(name: string) {
   return db.mindspaces.add({ name });
}

export function getMindspaces() {
   return db.mindspaces.toArray();
}

export function deleteMindspace(id: number) {
   return db.mindspaces.delete(id);
}
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

export function getMindspace(id: number) {
   return db.mindspaces.get(id);
}

export function updateMindspace(id: number, name: string) {
   console.log(id, name);
   return db.mindspaces.update(id, { name });
}
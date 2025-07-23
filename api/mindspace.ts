import { db } from "@/lib/db";

export function createMindspace(name: string, icon: string) {
   return db.mindspaces.add({ name, icon });
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

export function updateMindspace(id: number, name: string, icon: string) {
   console.log(id, name, icon);
   return db.mindspaces.update(id, { name, icon });
}
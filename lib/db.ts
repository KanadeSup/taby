import Dexie, { type EntityTable } from "dexie";

interface Mindspace {
   id: number;
   name: string;
   icon: string;
}

const db = new Dexie("TabbyDB") as Dexie & {
   mindspaces: EntityTable<Mindspace, "id">;
};

db.version(2).stores({
   mindspaces: "++id, name, icon",
});

export type { Mindspace };
export { db };

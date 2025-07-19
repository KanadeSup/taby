import Dexie, { type EntityTable } from "dexie";

interface Mindspace {
   id: number;
   name: string;
}

const db = new Dexie("TabbyDB") as Dexie & {
   mindspaces: EntityTable<Mindspace, "id">;
};

db.version(1).stores({
   mindspaces: "++id, name",
});

export type { Mindspace };
export { db };

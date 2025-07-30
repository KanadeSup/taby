import Dexie, { type EntityTable } from "dexie";
import Mindspace from "@/models/mindspace";
import Profile from "@/models/profile";

export default class AppDB extends Dexie {
   mindspaces!: EntityTable<Mindspace, "id">;
   profiles!: EntityTable<Profile, "id">;
   constructor() {
      super("TabbyDB");
      this.version(2).stores({
         mindspaces: "++id, name, icon, profileId",
         profiles: "++id, name, isDefault",
      });
      this.mindspaces.mapToClass(Mindspace);
      this.profiles.mapToClass(Profile);
   }
}

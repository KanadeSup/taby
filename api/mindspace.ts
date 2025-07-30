import { db } from "@/lib/db";
import { getCurrentProfileId, isProfileIdValid } from "./profile";

export async function createMindspace(
   name: string,
   icon: string,
   profileId?: number | null
) {
   let resolvedProfileId = profileId ?? await getCurrentProfileId();

   if (!resolvedProfileId || !(await isProfileIdValid(resolvedProfileId))) {
      throw new Error("No profile found");
   }

   return db.mindspaces.add({
      name,
      icon,
      profileId: resolvedProfileId,
   });
}

export async function getMindspaces(profileId: number) {
   const profile = await db.profiles.get(profileId);

   if (!profile) {
      throw new Error("Profile not found");
   }

   return db.mindspaces.where("profileId").equals(profileId).toArray();
}

export async function deleteMindspace(id: number) {
   return await db.mindspaces.delete(id);
}

export async function getMindspace(id: number) {
   return await db.mindspaces.get(id);
}

export async function updateMindspace(id: number, name: string, icon: string) {
   return await db.mindspaces.update(id, { name, icon });
}

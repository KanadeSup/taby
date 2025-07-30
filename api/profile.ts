import { db } from "@/lib/db";

export async function createProfile(name: string) {
   const newProfileId = await db.profiles.add({ name, isDefault: 0 });
   const createdProfile = await db.profiles.get(newProfileId);
   if (!createdProfile) {
      throw new Error("Failed to create profile");
   }
   return createdProfile;
}

export async function getProfiles() {
   const profiles = await db.profiles.toArray();
   return profiles;
}

export async function deleteProfile(id: number) {
   const profile = await db.profiles.get(id);
   if (!profile) {
      throw new Error("No profile found");
   }
   if (profile.isDefault === 1) {
      throw new Error("Cannot delete default profile");
   }
   await db.mindspaces.where("profileId").equals(id).delete();
   await db.profiles.delete(id);
}

export async function getProfile(id: number) {
   return await db.profiles.get(id);
}

export async function getCurrentProfileId() {
   const profileId = localStorage.getItem("currentProfileId");
   return profileId ? parseInt(profileId) : null;
}

export async function isProfileIdValid(profileId: number) {
   const profile = await db.profiles.get(profileId);
   return profile !== undefined;
}

export async function setCurrentProfileId(profileId: number) {
   const profile = await db.profiles.get(profileId);
   if (!profile) {
      throw new Error("Profile not found");
   }
   localStorage.setItem("currentProfileId", profileId.toString());
   return profile;
}

export async function getCurrentProfile() {
   const currentProfileId = await getCurrentProfileId();
   if (!currentProfileId) {
      throw new Error("No current profile set");
   }
   const profile = await db.profiles.get(currentProfileId);
   if (!profile) {
      throw new Error("Profile not found");
   }
   return profile;
}

export async function getOrCreateDefaultProfile() {
   const defaultProfile = await db.profiles
      .where("isDefault")
      .equals(1)
      .first();
   if (defaultProfile) {
      return defaultProfile;
   }
   const newProfileId = await db.profiles.add({
      name: "Default Profile",
      isDefault: 1,
   });
   const newProfile = await db.profiles.get(newProfileId);
   if (!newProfile) {
      throw new Error("Failed to create default profile");
   }
   return newProfile;
}

export async function updateProfile(id: number, name: string) {
   return db.profiles.update(id, { name });
}

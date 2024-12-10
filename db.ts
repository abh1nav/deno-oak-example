import { User } from "./types.ts";

// None of these methods use atomic operations.
// This is only for the purpose of prototyping.
const kv = await Deno.openKv();

export async function createUser(u: User): Promise<boolean> {
  const e = await getUser(u.id);
  if (e === null) {
    await kv.set(["users", u.id], u);
    return true;
  }
  return false;
}

export async function getUser(userId: string): Promise<User | null> {
  const u = await kv.get(["users", userId]);
  if (u.value === null) {
    return null;
  }
  return u.value as User;
}

export async function deleteUser(userId: string): Promise<void> {
  await kv.delete(["users", userId]);
}

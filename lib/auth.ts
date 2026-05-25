import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getCollection } from "./db";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "Miraj@2026";
const COOKIE_NAME = "pool_forever_admin";

type AdminUser = {
  username: string;
  passwordHash: string;
  updatedAt: string;
};

export function jwtSecret() {
  return process.env.JWT_SECRET || "development-secret-change-before-production";
}

export async function ensureAdminUser() {
  const users = await getCollection<AdminUser>("adminUsers");
  const defaultHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  if (!users) {
    return { username: DEFAULT_USERNAME, passwordHash: defaultHash, updatedAt: new Date().toISOString() };
  }

  const existing = await users.findOne({ username: DEFAULT_USERNAME });
  if (existing) return existing;

  const user = { username: DEFAULT_USERNAME, passwordHash: defaultHash, updatedAt: new Date().toISOString() };
  await users.insertOne(user);
  return user;
}

export async function verifyAdminCredentials(username: string, password: string) {
  if (username !== DEFAULT_USERNAME) return false;
  const user = await ensureAdminUser();
  return bcrypt.compare(password, user.passwordHash);
}

export function signAdminToken(username = DEFAULT_USERNAME) {
  return jwt.sign({ username, role: "admin" }, jwtSecret(), { expiresIn: "7d" });
}

export async function isAdminRequest() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const payload = jwt.verify(token, jwtSecret()) as { role?: string };
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function setAdminCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function changeAdminPassword(currentPassword: string, newPassword: string) {
  const valid = await verifyAdminCredentials(DEFAULT_USERNAME, currentPassword);
  if (!valid) return { ok: false, message: "Current password is incorrect." };
  if (newPassword.length < 8) return { ok: false, message: "New password must be at least 8 characters." };

  const users = await getCollection<AdminUser>("adminUsers");
  if (!users) return { ok: false, message: "Set MONGODB_URI to persist password changes." };

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await users.updateOne(
    { username: DEFAULT_USERNAME },
    { $set: { passwordHash, updatedAt: new Date().toISOString() } },
    { upsert: true }
  );
  return { ok: true, message: "Password updated." };
}

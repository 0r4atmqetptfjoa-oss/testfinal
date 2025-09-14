
export type Role = "ofiter"|"subofiter";
export type Filiera = "directa"|"indirecta";
export type Branch = "Infanterie"|"Tancuri"|"Vânători de munte"|"Artilerie"|"Geniu"|"Comunicații"|"Logistică"|"Medical";

const KEY = "user_profile_v2";

export type Profile = { role: Role|null; filiera: Filiera|null; branch: Branch|null };
export function getProfile(): Profile {
  try{ return JSON.parse(localStorage.getItem(KEY) || "{}"); }catch{ return {} as any; }
}
export function setProfile(p: Profile){ try{ localStorage.setItem(KEY, JSON.stringify(p)); }catch{} }
export function setBranch(branch: Branch){ const p = getProfile(); p.branch = branch; setProfile(p); }
export function setRole(role: Role){ const p = getProfile(); p.role = role; setProfile(p); }
export function setFiliera(filiera: Filiera){ const p = getProfile(); p.filiera = filiera; setProfile(p); }

export function branchSlug(branch?: Branch|null){
  const s = (branch || getProfile().branch || "").toString().toLowerCase();
  return s.replace(/[ăâîșșţț]/g, "a").replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
}

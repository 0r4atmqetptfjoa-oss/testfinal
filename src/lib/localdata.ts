
export type QuickItem = { id: string; title: string; subtitle?: string; route: string; icon?: string };
const K_RECENT = "recent_routes"; const K_MARKED = "marked_lessons"; const K_TESTS = "saved_tests";

export const LocalData = {
  getRecent(): QuickItem[] { try{ return JSON.parse(localStorage.getItem(K_RECENT) || "[]"); }catch{return [];} },
  addRecent(item: QuickItem){
    const arr = LocalData.getRecent().filter(i=> i.route !== item.route);
    arr.unshift(item); if (arr.length > 10) arr.pop();
    try{ localStorage.setItem(K_RECENT, JSON.stringify(arr)); }catch{}
  },
  getMarked(): QuickItem[] { try{ return JSON.parse(localStorage.getItem(K_MARKED) || "[]"); }catch{return [];} },
  getSavedTests(): QuickItem[] { try{ return JSON.parse(localStorage.getItem(K_TESTS) || "[]"); }catch{return [];} },
};

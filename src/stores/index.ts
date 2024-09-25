import { StoreApi, UseBoundStore } from "zustand";
import { createMrgnStore, MrgnState } from "./mrgn-store";

const useMrgnStore: UseBoundStore<StoreApi<MrgnState>> = createMrgnStore();

export { useMrgnStore };

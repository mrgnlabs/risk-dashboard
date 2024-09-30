import { Connection } from "@solana/web3.js";
import { create, StateCreator } from "zustand";
import { MarginfiClient, getConfig } from "@mrgnlabs/marginfi-client-v2";

interface MrgnState {
  // State
  mrgnClient: MarginfiClient | null;

  // Actions
  fetchMrgnClient: (args: { connection: Connection }) => void;
  refetchMrgnClient: (args: { connection: Connection }) => void;
}

function createMrgnStore() {
  return create<MrgnState>()(stateCreator);
}

const stateCreator: StateCreator<MrgnState, [], []> = (set, get) => ({
  // State
  mrgnClient: null,

  // Actions
  fetchMrgnClient: async (args) => {
    const mrgnClient = await MarginfiClient.fetch(
      getConfig("production"),
      {} as any,
      args.connection
    );
    set({ mrgnClient: mrgnClient });
  },

  refetchMrgnClient: async (args) => {
    set({ mrgnClient: null });
    const mrgnClient = await MarginfiClient.fetch(
      getConfig("production"),
      {} as any,
      args.connection
    );
    set({ mrgnClient: mrgnClient });
  },
});

export { createMrgnStore };
export type { MrgnState };

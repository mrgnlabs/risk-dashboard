import { type LucideIcon } from "lucide-react";
import { OraclePrice, Bank } from "@mrgnlabs/marginfi-client-v2";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}

export type UIPoolType = "All pools" | "Global pools" | "Isolated pools";

export type UIRiskModelType = "All" | "Buy" | "Sell";

export type healthTableDataType = {
  health: HealthCheckResult;
  type: string;
  tokenImage: string;
  tokenSymbol: string | null;
  oraclePrice: OraclePrice | null;
  liquidatorCapacity: string | null;
  currentBankLimit: string | null;
  dailyDisplaced: string | null;
  target: string | null;
};

export type oracleData = {
  oraclePrice: OraclePrice | null;
  tokenSymbol: string | null;
  tokenImage: string;
  tvl: number;
  isStale: boolean;
};

export type HealthCheckResult = {
  isHealthy: boolean;
  healthFactor: number;
  statusMessage: string;
};

export type RiskModelData = {
  liquidatorCapacity: string;
  dailyDisplaced: string;
};

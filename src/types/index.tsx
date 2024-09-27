import { type LucideIcon } from "lucide-react";
import { OraclePrice } from "@mrgnlabs/marginfi-client-v2";

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

export type dataType = {
  health: HealthCheckResult;
  type: string;
  tokenImage: string;
  tokenSymbol: string | null;
  price: OraclePrice | null;
  liquidatorCapacity: string | null;
  currentBankLimit: string | null;
  dailyDisplaced: string | null;
  target: string | null;
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

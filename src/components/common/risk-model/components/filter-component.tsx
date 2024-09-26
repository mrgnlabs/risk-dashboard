import * as dropdown from "~/components/ui/dropdown";
import { MenuIcon } from "lucide-react";
import * as React from "react";
import { UIRiskModelType } from "~/types";

interface FilterComponentProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<UIRiskModelType>>;
}
export const FilterComponent = ({
  selectedFilter,
  setSelectedFilter,
}: FilterComponentProps) => {
  return (
    <dropdown.DropdownMenu>
      <dropdown.DropdownMenuTrigger asChild>
        <button className="flex outline-none items-center gap-1 justify-center w-max px-2 py-1 rounded-md border ">
          <MenuIcon size={18} />
          {selectedFilter}
        </button>
      </dropdown.DropdownMenuTrigger>
      <dropdown.DropdownMenuContent>
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedFilter("All");
          }}
        >
          All
        </dropdown.DropdownMenuItem>
        <dropdown.DropdownMenuSeparator />
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedFilter("Buy");
          }}
        >
          Buy
        </dropdown.DropdownMenuItem>
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedFilter("Sell");
          }}
        >
          Sell
        </dropdown.DropdownMenuItem>
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
};

// TODO: combine two filter components into one, also rename cause filter and search might be confusing

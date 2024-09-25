import * as dropdown from "~/components/ui/dropdown";
import { MenuIcon } from "lucide-react";
import * as React from "react";
import { UIPoolType } from "~/types";

interface FilterComponentProps {
  selectedPool: string;
  setSelectedPool: React.Dispatch<React.SetStateAction<UIPoolType>>;
}
export const FilterComponent = ({
  selectedPool,
  setSelectedPool,
}: FilterComponentProps) => {
  return (
    <dropdown.DropdownMenu>
      <dropdown.DropdownMenuTrigger asChild>
        <button className="flex outline-none items-center gap-1 justify-center w-max px-2 py-1 rounded-md border ">
          <MenuIcon size={18} />
          {selectedPool}
        </button>
      </dropdown.DropdownMenuTrigger>
      <dropdown.DropdownMenuContent>
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedPool("All pools");
          }}
        >
          All pools
        </dropdown.DropdownMenuItem>
        <dropdown.DropdownMenuSeparator />
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedPool("Global pools");
          }}
        >
          Global pools
        </dropdown.DropdownMenuItem>
        <dropdown.DropdownMenuItem
          onClick={() => {
            setSelectedPool("Isolated pools");
          }}
        >
          Isolated pools
        </dropdown.DropdownMenuItem>
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
};

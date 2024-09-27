import * as dropdown from "~/components/ui/dropdown";
import { MenuIcon } from "lucide-react";
import * as React from "react";

interface FilterComponentProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
}
export const FilterComponent = ({
  selectedFilter,
  setSelectedFilter,
  items,
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
        {items.map((item) => (
          <dropdown.DropdownMenuItem
            onClick={() => {
              setSelectedFilter(item);
            }}
          >
            {item}
          </dropdown.DropdownMenuItem>
        ))}
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
};

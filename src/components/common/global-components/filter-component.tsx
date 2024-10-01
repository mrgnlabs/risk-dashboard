import * as dropdown from "~/components/ui/dropdown";
import { MenuIcon } from "lucide-react";
import * as React from "react";

interface FilterComponentProps {
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  items: string[] | string[][];
}

export const FilterComponent = ({
  selectedFilter,
  setSelectedFilter,
  items,
}: FilterComponentProps) => {
  const isMultiArray = Array.isArray(items[0]);

  return (
    <dropdown.DropdownMenu>
      <dropdown.DropdownMenuTrigger asChild>
        <button className="flex outline-none items-center gap-1 justify-center w-max px-2 py-1 rounded-md border border-border bg-foreground text-background hover:bg-gray-200 dark:bg-background dark:text-foreground dark:hover:bg-muted transition-colors">
          <MenuIcon size={18} />
          {selectedFilter}
        </button>
      </dropdown.DropdownMenuTrigger>
      <dropdown.DropdownMenuContent
        align="end"
        className=" bg-foreground border border-border text-background dark:bg-background dark:text-foreground transition-colors"
      >
        {isMultiArray
          ? (items as string[][]).map((subArray, arrayIndex) => (
              <React.Fragment key={arrayIndex}>
                {subArray.map((item, index) => (
                  <dropdown.DropdownMenuItem
                    onClick={() => {
                      setSelectedFilter(item);
                    }}
                    key={`${arrayIndex}-${index}`}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-muted transition-colors"
                  >
                    {item}
                  </dropdown.DropdownMenuItem>
                ))}
                {arrayIndex < (items as string[][]).length - 1 && (
                  <dropdown.DropdownMenuSeparator className="h-px bg-border my-1" />
                )}
              </React.Fragment>
            ))
          : (items as string[]).map((item, index) => (
              <dropdown.DropdownMenuItem
                onClick={() => {
                  setSelectedFilter(item);
                }}
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200 dark:hover:bg-muted transition-colors"
              >
                {item}
              </dropdown.DropdownMenuItem>
            ))}
      </dropdown.DropdownMenuContent>
    </dropdown.DropdownMenu>
  );
};

import { Input } from "~/components/ui/input";
import { UIRiskModelType } from "~/types";

interface SearchComponentProps {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const SearchComponent = ({ value, setValue }: SearchComponentProps) => {
  return (
    <Input
      placeholder="Filter by token symbol"
      value={value}
      onChange={(e) => setValue(e.target.value as UIRiskModelType)}
      className="sm:max-w-sm max-w-56"
    />
  );
};

// TODO: make more global (placeholder, className...)

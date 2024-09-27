import { Input } from "~/components/ui/input";

interface SearchComponentProps {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  placeHolder?: string;
  className?: string;
}

export const SearchComponent = ({
  value,
  setValue,
  placeHolder,
  className,
}: SearchComponentProps) => {
  return (
    <Input
      placeholder={placeHolder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`sm:max-w-sm max-w-56 ${className}`}
    />
  );
};

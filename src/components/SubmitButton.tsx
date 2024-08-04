import Image from "next/image";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SubmitButton = ({ isLoading, className, children }: Props) => {
  return (
    <Button
      type={"submit"}
      disabled={isLoading}
      className={cn("shad-primary-btn w-full", className)}
    >
      {isLoading ? (
        <div className={"flex items-center gap-4"}>
          <Image
            src={"/assets/icons/loader.svg"}
            width={24}
            height={24}
            alt={"loader"}
            className={"animate-spin"}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

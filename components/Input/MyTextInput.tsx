import { Input } from "@/components/shadcn/input";

export type MyTextInputProps = React.ComponentProps<typeof Input>;

export function MyTextInput(props: MyTextInputProps) {
   return (
      <Input
         className="focus-visible:ring-0 focus-visible:ring-offset-0"
         {...props}
      />
   );
}

import { Textarea } from "@/components/shadcn/textarea";

export type MyTextareaProps = React.ComponentProps<typeof Textarea>;

export function MyTextarea(props: MyTextareaProps) {
   return (
      <Textarea
         className="focus-visible:ring-0 focus-visible:ring-offset-0"
         {...props}
      />
   );
}

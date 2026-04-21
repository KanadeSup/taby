import { cn } from "@/lib/shadnc-utils";
import { EditNodeStyleState } from "../types";

type ColorPreset = {
   key: string;
   label: string;
   colors: {
      fill: string;
      border: string;
      text: string;
      branch: string;
   };
};

const presets: ColorPreset[] = [
   {
      key: "midnight",
      label: "Midnight",
      colors: {
         fill: "#0f172a",
         border: "#334155",
         text: "#e2e8f0",
         branch: "#94a3b8",
      },
   },
   {
      key: "forest",
      label: "Forest",
      colors: {
         fill: "#14532d",
         border: "#22c55e",
         text: "#f0fdf4",
         branch: "#86efac",
      },
   },
   {
      key: "sunset",
      label: "Sunset",
      colors: {
         fill: "#7c2d12",
         border: "#fb923c",
         text: "#fff7ed",
         branch: "#fdba74",
      },
   },
];

export type ColorSchemeSectionProps = {
   style: EditNodeStyleState;
   onChange: (nextStyle: EditNodeStyleState) => void;
};

export function ColorSchemeSection({ style, onChange }: ColorSchemeSectionProps) {
   return (
      <div className="space-y-2 p-2">
         {presets.map((preset) => (
            <button
               key={preset.key}
               type="button"
               className={cn(
                  "w-full p-2 border border-accent rounded-sm hover:bg-accent/60 text-left cursor-pointer"
               )}
               onClick={() =>
                  onChange({
                     ...style,
                     shape: { ...style.shape, fillColor: preset.colors.fill },
                     border: { ...style.border, color: preset.colors.border },
                     text: { ...style.text, color: preset.colors.text },
                     branch: { ...style.branch, color: preset.colors.branch },
                  })
               }
            >
               <p className="text-xs font-semibold">{preset.label}</p>
               <div className="mt-2 flex items-center gap-2">
                  {Object.values(preset.colors).map((color, index) => (
                     <span
                        key={`${preset.key}-${index}`}
                        className="w-5 h-5 rounded-sm border border-accent/80"
                        style={{ backgroundColor: color }}
                     />
                  ))}
               </div>
            </button>
         ))}
      </div>
   );
}

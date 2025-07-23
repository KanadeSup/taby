import { UserRound } from "lucide-react";
import { IconButton } from "../Button/IconButton";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import * as lucidIcon from "lucide-react";
import React, { useMemo, useState } from "react";
import { ScrollArea } from "../shadcn/scroll-area";
import { MyTextInput } from "../Input/MyTextInput";
export type IconSelectorProps = {
   buttonClassName?: string;
   onIconSelect?: (iconName: string) => void;
};

export function IconSelector({
   buttonClassName,
   onIconSelect,
}: IconSelectorProps) {
   const [selectedIcon, setSelectedIcon] =
      useState<keyof typeof lucidIcon>("UserRound");
   const SelectedIcon = lucidIcon[selectedIcon] as React.ElementType;
   const [search, setSearch] = useState("");
   const iconEntries = useMemo(
      () =>
         Object.entries(lucidIcon)
            .filter(([key]) => key.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 100),
      [search]
   );
   return (
      <div>
         <Popover modal={true}>
            <PopoverTrigger asChild>
               <IconButton className={buttonClassName}>
                  <SelectedIcon className="w-4 h-4" />
               </IconButton>
            </PopoverTrigger>
            <PopoverContent align="start" className="p-0 w-[300px]">
               <div className="p-2">
                  <MyTextInput
                     placeholder="Search for an icon"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <ScrollArea className="overflow-y-auto h-[300px] w-full p-2">
                  <div className="flex flex-wrap gap-1">
                     {iconEntries.map(([key, Icon]) => {
                        const IconComponent = Icon as React.ElementType;
                        return (
                           <div
                              key={key}
                              className={`flex items-center justify-center w-9 h-9 hover:bg-input/30 cursor-pointer rounded-md ${
                                 selectedIcon === key ? "bg-input/50" : ""
                              }`}
                              onClick={() => {
                                 setSelectedIcon(key as keyof typeof lucidIcon);
                                 onIconSelect?.(key);
                              }}
                           >
                              <IconComponent className="w-4 h-4" />
                           </div>
                        );
                     })}
                  </div>
               </ScrollArea>
            </PopoverContent>
         </Popover>
      </div>
   );
}

export type DragActiveTab = {
   title: string;
   url: string;
   favIconUrl?: string;
};

export type NodeMenuForInsert = {
   baseNodeId: string | null;
   baseNodeSide: "left" | "right";
   top: number;
   left: number;
};
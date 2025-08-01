export type DragActiveTab = {
   title: string;
   url: string;
   favIconUrl?: string;
};

export type NodeMenuForInsert = {
   baseNodeId: string | null;
   top: number;
   left: number;
};
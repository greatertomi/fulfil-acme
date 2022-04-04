export type DataHeader = {
  name: string;
  field: string;
  sortable?: boolean;
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

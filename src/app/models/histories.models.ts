
export class HistoriesModel{
  userPicture: string;
  userName: string;
  date: string;
  currentItem: number;
  live: boolean;
  active: boolean;
  seen: boolean;
  items: Item[];
}

interface Item {
  duration: number;
  id: string;
  media: string;
  seen: boolean;
  type: number;
  views?: any;
}

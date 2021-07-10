


export class EventsModel{
  name: string;
  image: string;
  date: string;
  from: string;
  to: string;
  location: string;
  description: string;
  attend: Attend;
}

interface Attend {
  avatars: string[];
  total: number;
}

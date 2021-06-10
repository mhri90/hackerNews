interface IStory {
  title: string;
  url: string;
  score: number;
  time: string;
  by: string;
}

interface IAuthor {
  about?: string;
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

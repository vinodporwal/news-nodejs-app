interface INews {
  _id: string;
  title: string;
  content: string;
  author: string;
  publicationDate: Date;
  category: string;
  source: string;
  url: string;
  imageUrl: string;
  tags: string[];
  views: number;
}

export default INews;

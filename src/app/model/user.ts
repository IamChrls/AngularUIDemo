export interface User {
  id: number;
  name: string;
  rating: number; // 1 to 5 hearts
  bio: string;
  likes: string[];
  dislikes: string[];
}
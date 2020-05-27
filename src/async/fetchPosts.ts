import { BASE_URL } from '../constants';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  isPrivate: boolean;
}

export default async function fetchPosts(
  page = 1,
  limit = 10,
): Promise<{ count: number; items: Post[] }> {
  try {
    const response = await fetch(`${BASE_URL}/posts?_page=${page}&_limit=${limit}`);
    const items = await response.json();
    const count = response.headers.get('x-total-count');

    return {
      count: count ? parseInt(count, 10) / limit : 0,
      items: items.map((item: Omit<Post, 'isPrivate'>) => ({
        ...item,
        isPrivate: Math.round(Math.random()) === 1 ? true : false,
      })),
    };
  } catch (err) {
    return err;
  }
}

import { BASE_URL } from '../constants';

export default async function createPost(post: { title: string; body: string }): Promise<{
  id: number;
  title: string;
  body: string;
  userId: number;
} | Error> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'post',
      body: JSON.stringify({
        ...post,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
    });
    const created = await response.json();

    return created;
  } catch (err) {
    return err as Error;
  }
}

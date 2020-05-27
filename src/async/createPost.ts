import { BASE_URL } from '../constants';

export default async function createPost(post: { title: string; body: string }): Promise<{ id: number }> {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'post',
      body: JSON.stringify({
        ...post,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return response.json();
  } catch (err) {
    return err;
  }
}

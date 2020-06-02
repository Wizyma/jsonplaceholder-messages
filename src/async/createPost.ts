import seed from '../seed.json';

export default async function createPost(post: { title: string; body: string }): Promise<{ id: number }> {
  const id = seed[seed.length -1 ].id + 1;
  seed.push({ title: post.title, body: post.body, userId: 3, id })
  return Promise.resolve({ id })
}

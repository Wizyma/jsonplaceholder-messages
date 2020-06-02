import seed from '../seed.json';
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  isPrivate: boolean;
}


function paginate<T>(data: T[], limit: number, page: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return data.slice((page - 1) * limit, page * limit);
}


export default async function fetchPosts(
  setCount: (count: number) => void,
  page = 1,
  limit = 10,
): Promise<Post[]> {
  const withPrivateProperty = seed.map((item: Omit<Post, 'isPrivate'>) => ({
    ...item,
    isPrivate: Math.round(Math.random()) === 1 ? true : false,
  }));
  
  const paginatedSeed = paginate<Post>(withPrivateProperty, limit, page)
  setCount(Math.ceil(seed.length / limit));
  return Promise.resolve(paginatedSeed)
}

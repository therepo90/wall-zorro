export const environment = {
    production: true,
    api: {
        posts: 'https://jsonplaceholder.typicode.com/posts',
        post(postId: string) {
            return `https://jsonplaceholder.typicode.com/posts/${postId}`;
        },
    },
};

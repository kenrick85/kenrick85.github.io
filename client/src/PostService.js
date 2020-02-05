import axios from 'axios';

const  url = 'http://localhost:5000/api/posts/';

class PostService {
    //get posts
    static getPosts(){
        return new Promise(async (resolve,reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            }
            catch (err) {
                reject(err);
            }
        })
    }

    //create posts
    static insertPost(course, location, price ) {
        return axios.post(url, {
            course, location, price
        });
    }

    //delete posts
    static deletePost(id)
    {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;
<template>
  <div class="container">
    <h1>Add new Course</h1>
    <div class="create-post">
      <label for="create-post">Course Name: </label>
      <input type="text" id="create-post" v-model="course" placeholder="Enter name of  course">
      <br>
      <label for="create-post">Location: </label>
      <input type="text" id="enter-location" v-model="location" placeholder="Enter the location">
      <br>
      <label for="create-post">Price: </label>
      <input type="text" id="enter-price" v-model="price" placeholder="Enter the price">
      <br>
      <button id="btnPost" v-on:click="createPost">Post</button>
    </div>  
    <hr>
    <p class ="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        v-on:dblclick="deletePost(post._id)"
      >
        <p><button id="btnDelete" v-on:click="deletePost(post._id)">Delete</button></p>
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()+1}/${post.createdAt.getFullYear()}` }}
        <p class="text">Course: {{ post.course }}</p>
        <p class="text">Location: {{ post.location }}</p>
        <p class="text">Price: {{ post.price }}</p>
        
      </div>
    </div> 
  </div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      course: '',
      location: '' ,
      price: ''     
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPosts(); 
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.course, this.location, this.price)
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 90%;
  margin: 0 auto;
}

#btnDelete {
  background-color: red;
  float: right;
}

#btnPost {
  background-color: rgb(218, 126, 21);
}
.post {
    border: 1px solid #d8c2c2;
    position: relative; 
    margin-left: 10px;
    float: left;
    background-color: rgb(255, 123, 0);
    width: 400px;

}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

.post-container {
  position: absolute;
  border: 1px solid #5bd658;
  background-color: #6139ce;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  width: 20%;
  float: right;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>




import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import HomeLink from "./homeLink";

const Posts = () => {

  const { id } = useParams();
  const [myPosts, setMyPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);
  const navigate = useNavigate();
  const [displayComments, setDisplayComments] = useState([]);
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('auth')) {
        navigate('/login');
        return;
      }

      const user = localStorage.getItem('auth');

      try {
        const response = await axios.get(`http://localhost:3500/pathSecurity/${id}`, {
          headers: { 'auth': user }
        });

        const isExisting = response.data;
        console.log(isExisting);

        if (!isExisting) {
          navigate('/');
          return;
        }
      } catch (err) {
        console.log(err);

        navigate('/');
      }
    })();
  }, []);

  useEffect(() => {
    getFirstPosts();
  }, [])

  const [currentPost,setCurrentPost]=useState('')

  async function getFirstPosts() {
    try {
      const response = await axios.get(`http://localhost:3500/posts`);
      const jsonPosts = response.data;
      setMyPosts(jsonPosts);
      setDisplayPosts(jsonPosts);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function deletePostDo(postId){
try{
  const response = await axios.delete(`http://localhost:3500/posts/delete/${postId}`,
  {headers:{"auth": `${localStorage.getItem('auth')}`}});
  if (response.data===false){alert("You may only delete your own posts") ; return;}
  const jsonPosts = response.data;
  console.log(response);
 
  setMyPosts(jsonPosts);
  setDisplayPosts(jsonPosts);
}
catch (error) {console.log(error);}
  }

  async function showComments(postId) {
    
    try {
      const response = await axios.get(`http://localhost:3500/posts/${postId}/comments`);
      setDisplayComments(response.data);
      console.log(displayComments);
      setCurrentPost(postId);
    } catch (error) { console.log(error) };

  }





  return (

    <>
    <HomeLink id={id}/>
      {displayPosts.map((post, key) =>
        <table className="postsTable">
<tr>
          <div> {`title: ${post.title}`}</div>
          <div> {`body: ${post.body}`}</div>
          <button onClick={() => showComments(post.id)}>Show comments</button>
          <button onClick={() => setDisplayComments([])}>Hide comments</button>
          <button onClick={() => deletePostDo(post.id)}> 🗑️ </button>

          { post.id== currentPost ? 
            displayComments.map((comment,key) => 
            <div>{`${key}.  ${comment.body}`}</div>
          ):null}
         </tr> 
        </table>


      )}
    </>

  )
  // async function getPosts() {
  //   try {
  //     const response = await axios.get(`http://localhost:3500/posts`);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // }

  // async function getPostsById(userId) {
  //   try {
  //     const response = await axios.get(`http://localhost:3500/posts?userId=${userId}`);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching posts by ID:', error);
  //   }
  // }

  // async function getFilteredPosts(criteria) {
  //   try {
  //     const response = await axios.get(`http://localhost:3500/posts${criteria}`);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error fetching filtered posts:', error);
  //   }
  // }

  // async function addPost(post) {
  //   try {
  //     const response = await axios.post(`http://localhost:3500/posts`, post);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error adding post:', error);
  //   }
  // }

  // async function addComment(comment) {
  //   try {
  //     const response = await axios.post(`http://localhost:3500/posts/${comment.postId}/comments`, comment);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error adding comment:', error);
  //   }
  // }

  // async function updatePost(id, body) {
  //   try {
  //     const response = await axios.patch(`http://localhost:3500/posts/update/${id}`, { body });
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //   }
  // }

  // async function deletePost(id) {
  //   try {
  //     const response = await axios.delete(`http://localhost:3500/posts/delete/${id}`);
  //     setDisplayPosts(response.data);
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // }

  // useEffect(() => {
  //   getPosts();
  // }, []);

  // return (
  //   <>
  //     <Link to="/">To Home Page</Link>
  //     {displayPosts.map((post) => (
  //       <div key={post.id}>
  //         <div>Title: {post.title}</div>
  //         <div>Body: {post.body}</div>
  //         <hr />
  //       </div>
  //     ))}
  //   </>
  // );
};

export default Posts;



// import React, { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// const Posts = () => {
//   const [displayPosts, setDisplayPosts] = useState([]);
//   const navigate = useNavigate();

//   async function getPosts() {
//     try {
//       const response = await axios.get(`http://localhost:3500/posts`);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }

//   async function getPostsById(userId) {
//     try {
//       const response = await axios.get(`http://localhost:3500/posts?userId=${userId}`);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error fetching posts by ID:', error);
//     }
//   }

//   async function getFilteredPosts(criteria) {
//     try {
//       const response = await axios.get(`http://localhost:3500/posts${criteria}`);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error fetching filtered posts:', error);
//     }
//   }

//   async function addPost(post) {
//     try {
//       const response = await axios.post(`http://localhost:3500/posts`, post);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error adding post:', error);
//     }
//   }

//   async function addComment(comment) {
//     try {
//       const response = await axios.post(`http://localhost:3500/posts/${comment.postId}/comments`, comment);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error adding comment:', error);
//     }
//   }

//   async function updatePost(id, body) {
//     try {
//       const response = await axios.patch(`http://localhost:3500/posts/update/${id}`, { body });
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error updating post:', error);
//     }
//   }

//   async function deletePost(id) {
//     try {
//       const response = await axios.delete(`http://localhost:3500/posts/delete/${id}`);
//       setDisplayPosts(response.data);
//     } catch (error) {
//       console.error('Error deleting post:', error);
//     }
//   }

//   useEffect(() => {
//     getPosts();
//   }, []);

//   return (
//     <>
//       <Link to="/">To Home Page</Link>
//       {displayPosts.map((post) => (
//         <div key={post.id}>
//           <div>Title: {post.title}</div>
//           <div>Body: {post.body}</div>
//           <button onClick={() => getPostsById(post.userId)}>Get Posts by ID</button>
//           <button onClick={() => getFilteredPosts("/filter")}>Get Filtered Posts</button>
//           <button onClick={() => addPost({ userId: post.userId, title: "New Post", body: "New Body" })}>
//             Add Post
//           </button>
//           <button onClick={() => addComment({ postId: post.id, name: "Commenter", email: "commenter@example.com", body: "New Comment" })}>
//             Add Comment
//           </button>
//           <button onClick={() => updatePost(post.id, "Updated Body")}>Update Post</button>
//           <button onClick={() => deletePost(post.id)}>Delete Post</button>
//           <hr />
//         </div>
//       ))}
//     </>
//   );
// };

// export default Posts;


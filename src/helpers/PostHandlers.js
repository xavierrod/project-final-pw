import useServer from '../hooks/useServer.js';

function PostHandler() {
  const { get, post, delete: destroy } = useServer();

  const likePost = async (id) => {
    return await post({ url: `/entries/${id}/votes` });
  };

  const dislikePost = async (id) => {
    return await post({ url: `/entries/${id}/votes` });
  };

  const deletePost = async (id) => {
    return await destroy({ url: `/entries/${id}` });
  };

  const getPostsByUser = async (user_id) => {
    return await get({ url: `/entries/user?id=${user_id}` });
  };

  return {
    likePost,
    dislikePost,
    deletePost,
    getPostsByUser,
  };
}

export default PostHandler;

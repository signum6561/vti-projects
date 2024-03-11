const BASE_API = 'https://jsonplaceholder.typicode.com/';
const contentDiv = document.querySelector('.content');
const detailTitle = document.getElementById('detail-title');
const detailContent = document.getElementById('detail-content');

//#region USER
const fetchUserList = async () => {
  const response = await fetch(`${BASE_API}/users`);
  return response.json();
};

const getAllUser = () => {
  handleDataFetch(fetchUserList, createUserCardList);
};

const createUserCardList = (userList) => {
  return userList
    .map(
      (user) => `
      <div class="card base-info">
        <p><strong>ID:</strong> ${user.id}</p>
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Username:</strong> ${user.username}</p>
        <button class="regular viewDetail-btn" onclick='viewDetailUser(${JSON.stringify(
          user,
        )})'>View Detail</button>
      </div>
`,
    )
    .join('');
};

const viewDetailUser = (user) => {
  detailTitle.innerHTML = `User Detail Title`;
  detailContent.innerHTML = `
          <div class="base-info">
            <h2>${user.name}</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Username:</strong> ${user.username}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</p>
          </div>
          `;
  openModal();
};

//#endregion

//#region POST
const fetchPostList = async () => {
  const response = await fetch(`${BASE_API}/posts`);
  return response.json();
};

const getAllPost = () => {
  handleDataFetch(fetchPostList, createPostCardList);
};

const createPostCardList = (postList) => {
  return postList
    .map(
      (post) => `
      <div class="card base-info">
        <p><strong>ID:</strong> ${post.id}</p>
        <p><strong>UserID:</strong> ${post.userId}</p>
        <button class="regular viewDetail-btn" onclick='viewDetailPost(${JSON.stringify(
          post,
        )})'>View Detail</button>
      </div>
`,
    )
    .join('');
};

const viewDetailPost = (post) => {
  detailTitle.innerHTML = `Post Detail Title`;
  detailContent.innerHTML = `
            <div class="base-info">
              <p><strong>ID:</strong> ${post.id}</p>
              <p><strong>UserID:</strong> ${post.userId}</p>
              <p><strong>Title:</strong> ${post.title}</p>
              <p><strong>Body:</strong> ${post.body}</p>
            </div>
      `;
  openModal();
};

//#endregion

//#region COMMENT
const fetchCommentList = async () => {
  const response = await fetch(`${BASE_API}/comments`);
  return response.json();
};

const getAllComment = () => {
  handleDataFetch(fetchCommentList, createCommentCardList);
};

const createCommentCardList = (commentList) => {
  return commentList
    .map(
      (comment) => `
      <div class="card base-info">
        <p><strong>ID:</strong> ${comment.id}</p>
        <p><strong>PostID:</strong> ${comment.postId}</p>
        <p><strong>Email:</strong> ${comment.email}</p>
        <button class="regular viewDetail-btn" onclick='viewDetailComment(${JSON.stringify(
          comment,
        )})'>View Detail</button>
      </div>
`,
    )
    .join('');
};

const viewDetailComment = (comment) => {
  detailTitle.innerHTML = `Comment Detail Title`;
  detailContent.innerHTML = `
            <div class="base-info">
              <p><strong>ID:</strong> ${comment.id}</p>
              <p><strong>PostID:</strong> ${comment.postId}</p>
              <p><strong>Email:</strong> ${comment.email}</p>
              <p><strong>Name:</strong> ${comment.name}</p>
              <p><strong>Body:</strong> ${comment.body}</p>
            </div>
      `;
  openModal();
};

//#endregion

//#region PHOTO
const fetchPhotoList = async () => {
  const response = await fetch(`${BASE_API}/photos`);
  return response.json();
};

const getAllPhoto = () => {
  handleDataFetch(fetchPhotoList, createPhotoCardList);
};

const createPhotoCardList = (photoList) => {
  return photoList
    .map(
      (photo) => `
      <div class="card img-info">
        <img src="${photo.thumbnailUrl}" alt="" width="150px" height="150px">
        <div class="base-info">
          <p><strong>ID:</strong> ${photo.id}</p>
          <p><strong>AlbumID:</strong> ${photo.albumId}</p>
          <button class="regular viewDetail-btn" onclick='viewDetailPhoto(${JSON.stringify(
            photo,
          )})'>
            View Detail
          </button>
        </div>
      </div>
`,
    )
    .join('');
};

const viewDetailPhoto = (photo) => {
  detailTitle.innerHTML = `Photo Detail Content`;
  detailContent.innerHTML = `
            <div class="img-info">
              <img src="${photo.url}" alt=""  width="300px" height="300px">
              <div class="base-info">
                <p><strong>ID:</strong> ${photo.id}</p>
                <p><strong>AlbumID:</strong> ${photo.albumId}</p>
                <p><strong>Title:</strong> ${photo.title}</p>
              </div>
            </div>
      `;
  openModal();
};

//#endregion

//#region ALBUM
const fetchAlbumList = async () => {
  const response = await fetch(`${BASE_API}/albums`);
  return response.json();
};

const getAllAlbum = () => {
  handleDataFetch(fetchAlbumList, createAlbumCardList);
};

const createAlbumCardList = (albumList) => {
  return albumList
    .map(
      (album) => `
      <div class="card base-info">
        <p><strong>ID:</strong> ${album.id}</p>
        <p><strong>UserID:</strong> ${album.userId}</p>
        <button class="regular viewDetail-btn" onclick='viewDetailAlbum(${JSON.stringify(
          album,
        )})'>View Detail</button>
      </div>
`,
    )
    .join('');
};

const viewDetailAlbum = (album) => {
  detailTitle.innerHTML = `Album Detail Title`;
  detailContent.innerHTML = `
            <div class="base-info">
              <p><strong>ID:</strong> ${album.id}</p>
              <p><strong>UserID:</strong> ${album.userId}</p>
              <p><strong>Title:</strong> ${album.title}</p>
            </div>
      `;
  openModal();
};

//#endregion

//#region TODO
const fetchTodoList = async () => {
  const response = await fetch(`${BASE_API}/todos`);
  return response.json();
};

const getAllTodo = () => {
  handleDataFetch(fetchTodoList, createTodoCardList);
};

const createTodoCardList = (todoList) => {
  return todoList
    .map(
      (todo) => `
      <div class="card base-info">
        <p><strong>ID:</strong> ${todo.id}</p>
        <p><strong>UserID:</strong> ${todo.userId}</p>
        <button class="regular viewDetail-btn" onclick='viewDetailTodo(${JSON.stringify(
          todo,
        )})'>View Detail</button>
      </div>
`,
    )
    .join('');
};

const viewDetailTodo = (todo) => {
  detailTitle.innerHTML = `Todo Detail Title`;
  detailContent.innerHTML = `
            <div class="base-info">
              <p><strong>ID:</strong> ${todo.id}</p>
              <p><strong>UserID:</strong> ${todo.userId}</p>
              <p><strong>Title:</strong> ${todo.title}</p>
              <p><strong>Completed:</strong> ${todo.completed}</p>
            </div>
      `;
  openModal();
};

//#endregion

const loadingScreen = () => {
  contentDiv.innerHTML = `
  <div class="loading">
    <h1>Loading...</h1>
  </div>
`;
};

const handleDataFetch = async (fetchData, createCardList) => {
  loadingScreen();
  fetchData()
    .then((data) => {
      contentDiv.innerHTML = createCardList(data);
    })
    .catch((err) => {
      console.error('Error fetch data', err);
    });
};

const openModal = () => {
  document.getElementById('myModal').style.display = 'block';
};

const closeModal = () => {
  document.getElementById('myModal').style.display = 'none';
};

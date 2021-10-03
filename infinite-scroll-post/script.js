'use strict';
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch post from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();
  return data;
}

// Show post from DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement('div');
    postEl.classList.add('post');
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <div class="post-body">${post.body}</div>
    </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Show loading
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
      console.log(page);
    }, 300);
  }, 1000);
}

// Filter posts
function filterPosts(e) {
  const term = e.target.value.toLowerCase();

  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const postTitle = post.querySelector('.post-title');
    const postBody = post.querySelector('.post-body');

    const title = postTitle.innerText.toLowerCase();
    const body = postBody.innerText.toLowerCase();

    if (title.includes(term) || body.includes(term)) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Show initial posts
showPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (Math.floor(scrollTop + clientHeight) === scrollHeight) {
    showLoading();
  }
});

filter.addEventListener('input', filterPosts);

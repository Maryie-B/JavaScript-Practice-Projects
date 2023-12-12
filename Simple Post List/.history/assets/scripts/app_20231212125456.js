
const elemList = document.querySelector('.posts');
const templatePost = document.getElementById('single-post');
const formular = document.querySelector('#new-post form');
const btnFetch = document.querySelector('#available-posts button');
const wholeList = document.querySelector('ul');

function sendRequest(method, url, data) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/jason'
        }
    }).then(response => {
        if (response.status >= 200 && response.status <= 300) {
            return response.json();
        } else {
            response.json().then(errorData => {
                console.log(errorData);
                throw new Error('Go fuck yourself!')
            });
            
        }});
}


async function fetchPosts() {
    try {
        const responseData = await sendRequest(
        'GET', 
        'https://jsonplaceholder.typicode.com/posts');
    const listPosts = responseData;
    console.log(listPosts);
    for (const post of listPosts) {
        const postEl = document.importNode(templatePost.content, true);
        postEl.querySelector('h2').textContent = post.title.toUpperCase();
        postEl.querySelector('p').textContent = post.body;
        postEl.querySelector('li').id = post.id;
        elemList.append(postEl);
    }
    } catch (error) {
        alert(error.message);
    }

}


async function createPost(title, content) {
    const idPost = Math.random();
    const post = {
        title: title,
        body: content,
        userId: idPost
    };
    sendRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

btnFetch.addEventListener('click', fetchPosts);
formular.addEventListener('submit', event => {
    event.preventDefault();
    const typedTitle = event.currentTarget.querySelector('#title').value;
    const typedContent = event.currentTarget.querySelector('#content').value;

    createPost(typedTitle, typedContent);
} );


wholeList.addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') {
        const postId = event.target.closest('li').id;
        sendRequest('DELETE', `https://jsonplaceholder.typicode.com/posts/${postId}`);
    }
});


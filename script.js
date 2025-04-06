document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const chatMessage = document.getElementById('chat-message');
    const username = document.getElementById('username');
    const sendButton = document.getElementById('send-button');

    const buyerPosts = document.getElementById('buyer-posts');
    const buyerName = document.getElementById('buyer-name');
    const buyerMessage = document.getElementById('buyer-message');
    const buyerSend = document.getElementById('buyer-send');

    const sellerPosts = document.getElementById('seller-posts');
    const sellerName = document.getElementById('seller-name');
    const sellerMessage = document.getElementById('seller-message');
    const sellerSend = document.getElementById('seller-send');

    const fetchMessages = async () => {
        const response = await fetch('get_messages.php');
        const messages = await response.json();
        chatWindow.innerHTML = '';
        messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message');
            messageDiv.innerHTML = `<strong>${message.username}</strong>: ${message.text} <button class="like-button">Like</button>`;
            chatWindow.appendChild(messageDiv);
        });
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const fetchBuyerPosts = async () => {
        const response = await fetch('get_buyer_posts.php');
        const posts = await response.json();
        buyerPosts.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<strong>${post.username}</strong>: ${post.message}`;
            buyerPosts.appendChild(postDiv);
        });
    };

    const fetchSellerPosts = async () => {
        const response = await fetch('get_seller_posts.php');
        const posts = await response.json();
        sellerPosts.innerHTML = '';
        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<strong>${post.username}</strong>: ${post.message}`;
            sellerPosts.appendChild(postDiv);
        });
    };

    sendButton.addEventListener('click', async () => {
        const message = chatMessage.value;
        const user = username.value || 'Anonymous';
        if (message.trim()) {
            await fetch('post_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, text: message })
            });
            chatMessage.value = '';
            fetchMessages();
        }
    });

    buyerSend.addEventListener('click', async () => {
        const message = buyerMessage.value;
        const user = buyerName.value || 'Anonymous Buyer';
        if (message.trim()) {
            await fetch('post_buyer_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, message: message })
            });
            buyerMessage.value = '';
            fetchBuyerPosts();
        }
    });

    sellerSend.addEventListener('click', async () => {
        const message = sellerMessage.value;
        const user = sellerName.value || 'Anonymous Seller';
        if (message.trim()) {
            await fetch('post_seller_post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: user, message: message })
            });
            sellerMessage.value = '';
            fetchSellerPosts();
        }
    });

    fetchMessages();
    fetchBuyerPosts();
    fetchSellerPosts();
    setInterval(fetchMessages, 5000); // Fetch new messages every 5 seconds
    setInterval(fetchBuyerPosts, 5000); // Fetch new buyer posts every 5 seconds
    setInterval(fetchSellerPosts, 5000); // Fetch new seller posts every 5 seconds
});
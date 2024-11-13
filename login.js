document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('users.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.username === username && user.password === password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user)); // Store user data in localStorage
                if (user.role === 'admin') {
                    window.location.href = 'admin.html'; // Redirect to Admin page
                } else {
                    window.location.href = 'user.html'; // Redirect to User page
                }
            } else {
                document.getElementById('error-message').textContent = 'Invalid Username or Password';
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
});

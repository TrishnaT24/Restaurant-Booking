// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get login form elements
    const loginForm = document.querySelector('form');
    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    // Get social media login buttons
    const fbBtn = document.querySelector('.fb-btn');
    const googleBtn = document.querySelector('.google-btn');
    const twitterBtn = document.querySelector('.twitter-btn');
    
    // Add event listener for form submission (Login Button)
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent page refresh
        
        // Get input values
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Simple validation (Check if fields are empty)
        if (username === "" || password === "") {
            alert("Please fill out both username and password fields.");
            return;
        }

        // Placeholder logic for real login (replace with actual backend integration)
        if (username === "testuser" && password === "password") {
            alert("Login successful!");
            // You can redirect to another page or update the UI
            window.location.href = "/home";  // Example redirection
        } else {
            alert("Invalid username or password.");
        }
    });
    
    // Event listeners for social media login buttons
    fbBtn.addEventListener('click', function() {
        alert("Facebook login clicked!");
        // Placeholder logic for Facebook login (requires Facebook OAuth API)
        // window.location.href = "https://www.facebook.com/v12.0/dialog/oauth?...";  // Facebook OAuth link
    });
    
    googleBtn.addEventListener('click', function() {
        alert("Google login clicked!");
        // Placeholder logic for Google login (requires Google OAuth API)
        // window.location.href = "https://accounts.google.com/o/oauth2/auth?...";  // Google OAuth link
    });
    
    twitterBtn.addEventListener('click', function() {
        alert("Twitter login clicked!");
        // Placeholder logic for Twitter login (requires Twitter OAuth API)
        // window.location.href = "https://api.twitter.com/oauth/authenticate?...";  // Twitter OAuth link
    });
});

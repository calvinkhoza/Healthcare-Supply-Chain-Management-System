// Authentication Handling
document.addEventListener("DOMContentLoaded", function () {
  // Check for existing session (simplified)
  const checkSession = () => {
    // In a real app, this would check cookies/localStorage/tokens
    const isLoggedIn = localStorage.getItem("healthcareSupplyChainLoggedIn");

    if (isLoggedIn) {
      document.getElementById("login-screen").classList.add("hidden");
      document.getElementById("app-container").classList.remove("hidden");

      // Set username from storage
      const username = localStorage.getItem("healthcareSupplyChainUsername");
      if (username) {
        const usernameElements = document.querySelectorAll(".username");
        usernameElements.forEach((el) => {
          el.textContent = username;
        });
      }
    }
  };

  // Initialize session check
  checkSession();

  // Login form submission
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple validation (in a real app, this would be a server call)
      if (username && password) {
        // Simulate successful login
        localStorage.setItem("healthcareSupplyChainLoggedIn", "true");
        localStorage.setItem("healthcareSupplyChainUsername", username);

        // Hide login, show app
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");

        // Set username in sidebar
        const usernameElements = document.querySelectorAll(".username");
        usernameElements.forEach((el) => {
          el.textContent = username;
        });
      } else {
        alert("Please enter both username and password");
      }
    });
  }

  // Logout functionality
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Clear session
      localStorage.removeItem("healthcareSupplyChainLoggedIn");
      localStorage.removeItem("healthcareSupplyChainUsername");

      // Hide app, show login
      document.getElementById("app-container").classList.add("hidden");
      document.getElementById("login-screen").classList.remove("hidden");

      // Clear form
      if (document.getElementById("username")) {
        document.getElementById("username").value = "";
      }
      if (document.getElementById("password")) {
        document.getElementById("password").value = "";
      }
    });
  }
});

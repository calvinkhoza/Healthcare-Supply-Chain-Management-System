// Main Application Script
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const loginScreen = document.getElementById("login-screen");
  const appContainer = document.getElementById("app-container");
  const loginForm = document.getElementById("login-form");
  const logoutBtn = document.getElementById("logout-btn");
  const navItems = document.querySelectorAll(".sidebar-nav li");
  const contentSections = document.querySelectorAll(".content-section");
  const pageTitle = document.getElementById("page-title");

  // Simulate login
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Simple validation (in a real app, this would be a server call)
      if (username && password) {
        loginScreen.classList.add("hidden");
        appContainer.classList.remove("hidden");

        // Set username in sidebar
        const usernameElements = document.querySelectorAll(".username");
        usernameElements.forEach((el) => {
          el.textContent = username;
        });
      }
    });
  }

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      appContainer.classList.add("hidden");
      loginScreen.classList.remove("hidden");
      document.getElementById("username").value = "";
      document.getElementById("password").value = "";
    });
  }

  // Navigation between sections
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all nav items
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");
      });

      // Add active class to clicked item
      this.classList.add("active");

      // Get the section to show
      const sectionId = this.getAttribute("data-section");

      // Hide all content sections
      contentSections.forEach((section) => {
        section.classList.add("hidden");
      });

      // Show the selected section
      document
        .getElementById(`${sectionId}-section`)
        .classList.remove("hidden");

      // Update page title
      const sectionName = this.querySelector("span").textContent;
      pageTitle.textContent = sectionName;
    });
  });

  // Initialize charts (simplified for this example)
  initializeCharts();

  // Initialize inventory management
  initializeInventory();
});

function initializeCharts() {
  // This is a simplified version. In a real app, you would use a library like Chart.js

  // Inventory Trend Chart (placeholder)
  const inventoryTrendChart = document.getElementById("inventory-trend-chart");
  if (inventoryTrendChart) {
    inventoryTrendChart.innerHTML =
      "<p>Inventory trend chart will be displayed here</p>";
  }

  // Critical Items Chart (placeholder)
  const criticalItemsChart = document.getElementById("critical-items-chart");
  if (criticalItemsChart) {
    criticalItemsChart.innerHTML =
      "<p>Critical items chart will be displayed here</p>";
  }

  // Map marker interactions
  const mapMarkers = document.querySelectorAll(".map-marker");
  const mapTooltip = document.createElement("div");
  mapTooltip.className = "map-tooltip hidden";
  document.querySelector(".map").appendChild(mapTooltip);

  mapMarkers.forEach((marker) => {
    marker.addEventListener("mouseenter", function () {
      const severity = this.getAttribute("data-severity");
      let content = "";

      if (severity === "minor") {
        content = `
                    <h4>Weather Delay</h4>
                    <p>Regional storms causing 1-2 day delays</p>
                    <p><span class="severity minor">Minor</span></p>
                `;
      } else if (severity === "moderate") {
        content = `
                    <h4>Supplier Issue</h4>
                    <p>Manufacturing delay at supplier facility</p>
                    <p><span class="severity moderate">Moderate</span></p>
                `;
      } else if (severity === "severe") {
        content = `
                    <h4>Transportation Strike</h4>
                    <p>Major port workers strike blocking shipments</p>
                    <p><span class="severity severe">Severe</span></p>
                `;
      }

      mapTooltip.innerHTML = content;
      mapTooltip.style.left = `${this.offsetLeft + 20}px`;
      mapTooltip.style.top = `${this.offsetTop}px`;
      mapTooltip.classList.remove("hidden");
    });

    marker.addEventListener("mouseleave", function () {
      mapTooltip.classList.add("hidden");
    });
  });
}

function initializeInventory() {
  // This would be more complex in a real app with actual data
  console.log("Inventory management initialized");

  // Add event listeners to filter dropdowns
  const filters = ["location", "category", "status"];

  filters.forEach((filter) => {
    const element = document.getElementById(`${filter}-filter`);
    if (element) {
      element.addEventListener("change", function () {
        // In a real app, this would filter the inventory table
        console.log(`Filter changed: ${filter} = ${this.value}`);
      });
    }
  });

  // Add click handlers to action buttons in the table
  const actionButtons = document.querySelectorAll(".inventory-table .btn-icon");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const action = this.getAttribute("title");
      const row = this.closest("tr");
      const itemId = row.querySelector("td:first-child").textContent;
      const itemName = row.querySelector("td:nth-child(2)").textContent;

      console.log(`${action} clicked for ${itemName} (${itemId})`);

      // In a real app, this would trigger the appropriate action
      if (action === "Edit") {
        // Open edit modal
      } else if (action === "View Details") {
        // Open details view
      } else if (action === "Reorder") {
        // Initiate reorder process
      }
    });
  });
}

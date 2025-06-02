// Inventory Management Functions
document.addEventListener("DOMContentLoaded", function () {
  // Sample inventory data
  const inventoryData = [
    {
      id: "MED-1001",
      name: "N95 Masks",
      category: "PPE",
      location: "Main Warehouse",
      stock: 125,
      threshold: 200,
      status: "warning",
      expiry: "2023-12-15",
    },
    {
      id: "MED-2045",
      name: "Ventilator Parts",
      category: "Equipment",
      location: "Central Hospital",
      stock: 32,
      threshold: 20,
      status: "success",
      expiry: "N/A",
    },
    {
      id: "MED-3012",
      name: "Insulin",
      category: "Pharmaceuticals",
      location: "North Clinic",
      stock: 0,
      threshold: 50,
      status: "danger",
      expiry: "2024-05-20",
    },
    {
      id: "MED-4023",
      name: "Gloves (Box)",
      category: "PPE",
      location: "Main Warehouse",
      stock: 450,
      threshold: 100,
      status: "success",
      expiry: "2025-03-10",
    },
    {
      id: "MED-5034",
      name: "Antibiotics",
      category: "Pharmaceuticals",
      location: "Central Hospital",
      stock: 85,
      threshold: 50,
      status: "success",
      expiry: "2024-11-30",
    },
  ];

  // Render inventory table
  function renderInventoryTable(data) {
    const tableBody = document.querySelector(".inventory-table tbody");
    tableBody.innerHTML = "";

    data.forEach((item) => {
      const row = document.createElement("tr");

      // Determine status badge class
      let statusClass = "";
      let statusText = "";

      if (item.status === "success") {
        statusClass = "success";
        statusText = "In Stock";
      } else if (item.status === "warning") {
        statusClass = "warning";
        statusText = "Low Stock";
      } else if (item.status === "danger") {
        statusClass = "danger";
        statusText = "Out of Stock";
      }

      row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.location}</td>
                <td>${item.stock}</td>
                <td>${item.threshold}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${item.expiry}</td>
                <td class="actions">
                    <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon" title="Reorder"><i class="fas fa-shopping-cart"></i></button>
                </td>
            `;

      tableBody.appendChild(row);
    });

    // Add event listeners to action buttons
    const actionButtons = document.querySelectorAll(
      ".inventory-table .btn-icon"
    );
    actionButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const action = this.getAttribute("title");
        const row = this.closest("tr");
        const itemId = row.querySelector("td:first-child").textContent;
        const itemName = row.querySelector("td:nth-child(2)").textContent;

        handleInventoryAction(action, itemId, itemName);
      });
    });
  }

  // Handle inventory actions
  function handleInventoryAction(action, itemId, itemName) {
    console.log(`${action} action for ${itemName} (${itemId})`);

    // In a real app, these would trigger modals or other UI
    switch (action) {
      case "Edit":
        alert(`Edit item: ${itemName}`);
        break;
      case "View Details":
        alert(`View details for: ${itemName}`);
        break;
      case "Reorder":
        alert(`Initiate reorder for: ${itemName}`);
        break;
    }
  }

  // Filter inventory
  function filterInventory() {
    const locationFilter = document.getElementById("location-filter").value;
    const categoryFilter = document.getElementById("category-filter").value;
    const statusFilter = document.getElementById("status-filter").value;

    let filteredData = [...inventoryData];

    if (locationFilter !== "all") {
      filteredData = filteredData.filter((item) =>
        item.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      filteredData = filteredData.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (statusFilter !== "all") {
      let statusValue = "";
      if (statusFilter === "in-stock") statusValue = "success";
      if (statusFilter === "low-stock") statusValue = "warning";
      if (statusFilter === "out-of-stock") statusValue = "danger";

      filteredData = filteredData.filter((item) => item.status === statusValue);
    }

    renderInventoryTable(filteredData);
  }

  // Initialize inventory management
  function initInventory() {
    // Render initial table
    renderInventoryTable(inventoryData);

    // Add event listeners to filter dropdowns
    const filters = ["location", "category", "status"];

    filters.forEach((filter) => {
      const element = document.getElementById(`${filter}-filter`);
      if (element) {
        element.addEventListener("change", filterInventory);
      }
    });

    // Add item button
    const addItemBtn = document.querySelector(
      ".inventory-actions .btn-primary"
    );
    if (addItemBtn) {
      addItemBtn.addEventListener("click", function () {
        alert("Add new item functionality would go here");
      });
    }
  }

  // Initialize when inventory section is loaded
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.target.id === "inventory-section" &&
        !mutation.target.classList.contains("hidden")
      ) {
        initInventory();
        observer.disconnect();
      }
    });
  });

  observer.observe(document.getElementById("inventory-section"), {
    attributes: true,
    attributeFilter: ["class"],
  });
});

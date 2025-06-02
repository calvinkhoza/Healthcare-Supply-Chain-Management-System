// Analytics Functions
document.addEventListener("DOMContentLoaded", function () {
  // Initialize analytics when section is loaded
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.target.id === "analytics-section" &&
        !mutation.target.classList.contains("hidden")
      ) {
        initAnalytics();
        observer.disconnect();
      }
    });
  });

  observer.observe(document.getElementById("analytics-section"), {
    attributes: true,
    attributeFilter: ["class"],
  });

  function initAnalytics() {
    console.log("Analytics section initialized");

    // In a real app, this would initialize charts with actual data
    // For this example, we'll just show placeholders

    const analyticsContent = document.getElementById("analytics-section");
    analyticsContent.innerHTML = `
            <div class="analytics-header">
                <h2>Predictive Analytics</h2>
                <div class="analytics-actions">
                    <select id="time-range">
                        <option value="7">Last 7 days</option>
                        <option value="30" selected>Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>
                </div>
            </div>
            
            <div class="analytics-grid">
                <div class="analytics-card">
                    <h3>Demand Forecasting</h3>
                    <div class="chart-placeholder">
                        <p>Demand forecasting chart will be displayed here</p>
                    </div>
                </div>
                
                <div class="analytics-card">
                    <h3>Disruption Predictions</h3>
                    <div class="chart-placeholder">
                        <p>Disruption prediction chart will be displayed here</p>
                    </div>
                </div>
                
                <div class="analytics-card full-width">
                    <h3>Supply Chain Risk Assessment</h3>
                    <div class="chart-placeholder">
                        <p>Risk assessment visualization will be displayed here</p>
                    </div>
                </div>
            </div>
        `;

    // Add event listener to time range selector
    const timeRangeSelect = document.getElementById("time-range");
    if (timeRangeSelect) {
      timeRangeSelect.addEventListener("change", function () {
        console.log(`Time range changed to: ${this.value} days`);
        // In a real app, this would reload data for the selected range
      });
    }
  }
});

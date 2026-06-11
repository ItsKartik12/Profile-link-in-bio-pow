(() => {
  // Explicit DOM element lookup targeting
  const insertContainer = document.querySelector("#insert");

  if (!insertContainer) {
    console.error("DOM Injection Target Error: #insert element not detected.");
    return;
  }

  // Store the initial HTML to allow resetting the view
  const initialHTML = insertContainer.innerHTML;

  window.addEventListener("keydown", (event) => {
    // Intercept default browser container motions (e.g., Spacebar or Arrow page scrolling)
    if (event.key === " " || event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }

    // Reset feature: Pressing 'Escape' brings back the initial prompt
    if (event.key === "Escape") {
      insertContainer.innerHTML = initialHTML;
      return;
    }

    // Explicitly parse spatial naming transformations
    const normalizedKey = event.key === " " ? "Space" : event.key;

    // Fallback engine handling for deprecated keyCode tracking safely
    const legacyCode = event.keyCode || event.which || "N/A"; // Fixed non-standard viewModel

    // Inject clean layout structure directly into the container
    insertContainer.innerHTML = `
      <div class="table-wrapper pop-anim" id="active-table">
        <table>
          <thead>
            <tr>
              <th>Event.key</th>
              <th>Legacy.which</th>
              <th>Event.code</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${escapeHtml(normalizedKey)}</td>
              <td>${legacyCode}</td>
              <td>${escapeHtml(event.code)}</td>
            </tr>
          </tbody>
        </table>
        <div style="text-align: center; margin-top: 10px; color: #6b7280; font-size: 0.8rem;">
          Press <strong>Escape</strong> to clear
        </div>
      </div>
    `;

    // Re-trigger the pop animation for rapid subsequent keystrokes
    const tableWrapper = document.getElementById('active-table');
    tableWrapper.classList.remove('pop-anim');
    void tableWrapper.offsetWidth; // Trigger reflow to restart animation
    tableWrapper.classList.add('pop-anim');
  });

  // Helper utility to strictly neutralize string injection values to prevent XSS
  function escapeHtml(string) {
    return String(string)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
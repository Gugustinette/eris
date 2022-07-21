/**
 * background.js
 */
// Get current tab
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Injected function
function loadWebsiteStyle() {
  // Access chrome extension storage
  chrome.storage.sync.get("cssStyles", (result) => {
    // Initialize styles
    let styles = [];
    if (result.cssStyles) {
      styles = result.cssStyles;
      styles = Object.values(styles);
    }

    // Find styles with same domain
    if (styles.length > 0) {
      let domainStyles = styles.filter(
        (style) => style.domain === window.location.hostname
      );

      if (domainStyles.length > 0) {
        // Find active styles
        let activeStyles = domainStyles.filter((style) => style.active);
        // Find unactive styles
        let unactiveStyles = domainStyles.filter((style) => !style.active);

        if (activeStyles.length > 0) {
          // Apply styles
          activeStyles.forEach((style) => {
            // Try to get style tag with id
            let styleTag = document.getElementById(
              "eris-style-tag-" + style._id
            );
            // Tag doesn't exist or style is different
            if (!styleTag || styleTag.innerHTML !== style.css) {
              // Inject style
              let styleElement = document.createElement("style");
              styleElement.setAttribute("id", "eris-style-tag-" + style._id);
              styleElement.innerHTML = style.css;
              document.head.appendChild(styleElement);
            }
          });
        }
        if (unactiveStyles.length > 0) {
          // Remove styles
          unactiveStyles.forEach((style) => {
            // Try to get style tag with id
            let styleTag = document.getElementById(
              "eris-style-tag-" + style._id
            );
            // Tag exists
            if (styleTag) {
              // Remove style
              styleTag.remove();
            }
          });
        }
      }
    }
  });
}

// Main function
async function applyStyle(tab, tabId) {
  // If the url starts with "https://" or "http://"
  if (tab.url.startsWith("https://" || "http://")) {
    // Inject script
    chrome.scripting.executeScript({
      target: {
        tabId: tabId,
      },
      func: loadWebsiteStyle,
    });
  }
}

// When the user change tab
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // Get current tab
  let tab = await getCurrentTab();
  // Display the actual profil
  applyStyle(tab, activeInfo.tabId);
});

// When the user open a new tab
chrome.tabs.onCreated.addListener(async (tab) => {
  // Display the actual profil
  applyStyle(tab, tab.id);
});

// When the user navigate to a new url
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Display the actual profil
  applyStyle(tab, tabId);
});

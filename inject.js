(function () {
    if (window.__reactInjected) return;
    window.__reactInjected = true;

    function injectReact(url) {
        console.log("Injecting React into Shadow DOM inside body...");

        // Check if shadow host already exists
        let shadowHost = document.getElementById("shadow-llama-3.2-webgpu");
        if (shadowHost) {
            console.log("Shadow DOM already injected. Skipping...");
            return; // Prevent multiple injections
        }

        // Create a Shadow Host (container for Shadow DOM)
        shadowHost = document.createElement("div");
        shadowHost.id = "shadow-llama-3.2-webgpu";
        shadowHost.style.width = "40px";
        shadowHost.style.height = "40px";
        shadowHost.style.position = "fixed";
        shadowHost.style.bottom = "20px";
        shadowHost.style.right = "20px";
        shadowHost.style.cursor = "pointer";
        shadowHost.style.zIndex = "9999"; // Ensure it stays above other elements
        shadowHost.style.backgroundImage = `url(${chrome.runtime.getURL("vite.svg")})`;
        shadowHost.style.backgroundSize = "contain";
        shadowHost.style.backgroundRepeat = "no-repeat";
        shadowHost.style.backgroundPosition = "center";
        document.body.appendChild(shadowHost);

        // Attach Shadow DOM to the host
        let shadowRoot = shadowHost.attachShadow({ mode: "open" });

        // Create iframe inside Shadow Root (Initially Hidden)
        let iframe = document.createElement("iframe");
        iframe.id = "llama-3.2-webgpu";
        iframe.src = url; // ✅ Use the URL received from background script
        iframe.style.width = "100$";
        iframe.style.height = "500px";
        iframe.style.border = "1px solid red";
        iframe.style.overflow = "hidden";
        iframe.style.position = "fixed";
        iframe.style.bottom = "70px";
        iframe.style.right = "20px";
        iframe.style.zIndex = "10000"; // Ensure it stays above other elements
        // iframe.style.display = "none"; // Initially hidden

        shadowRoot.appendChild(iframe);

        // Toggle iframe visibility on clicking the vite logo
        shadowHost.addEventListener("click", () => {
            if (iframe.style.display === "none") {
                iframe.style.display = "block"; // Show chatbot
            } else {
                iframe.style.display = "none"; // Hide chatbot
            }
        });

        // Disconnect observer once injected
        observer.disconnect();
        console.log("Observer disconnected after injection.");
    }

    // Watch for body mutations to inject React
    const observer = new MutationObserver(() => {
        console.log("MutationObserver triggered, checking for body...");
        if (document.body) {
            chrome.runtime.sendMessage({ action: "getReactURL" }, (response) => {
                if (response && response.url) {
                    injectReact(response.url);
                } else {
                    console.error("Failed to load React URL.");
                }
            });
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    // Initial check in case body is already present
    console.log("Observer started, checking if body is already present...");
    if (document.body) {
        chrome.runtime.sendMessage({ action: "getReactURL" }, (response) => {
            if (response && response.url) {
                injectReact(response.url);
            } else {
                console.error("Failed to load React URL.");
            }
        });
    }
})();
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("clickMe");
    if (button) {
        button.addEventListener("click", () => {
            alert("Button Clicked!");
        });
    }
});

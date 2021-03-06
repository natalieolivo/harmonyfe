import "./error.scss";

const RenderErrors = (errors) => {
    const errorContainer = document.querySelector(".error-container");
    let errorTemplate = "";
    errors.forEach((error) => {
        errorTemplate += `<div class="error-block">${error}</div>`
    });
    errorContainer.innerHTML = errorTemplate;
}

export { RenderErrors };
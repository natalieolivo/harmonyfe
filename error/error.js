import "./error.scss";

const errorContainer = document.querySelector(".error-container");

const RenderErrors = (errors) => {    
    let errorTemplate = "";
    errors.split(",").forEach((error) => {
        errorTemplate += `<div class="error-block">${error}</div>`
    });
    errorContainer.innerHTML = errorTemplate;
}

export { RenderErrors };
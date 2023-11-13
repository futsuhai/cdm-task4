const form = document.querySelector(".register-form");
const popup = document.querySelector(".popup");
const message = document.querySelector(".container__message");

const fields = [
    { input: document.getElementById("email"), error: createErrorElement("email") },
    { input: document.getElementById("full-name"), error: createErrorElement("full-name") },
    { input: document.getElementById("password"), error: createErrorElement("password") },
    { input: document.getElementById("password-confirm"), error: createErrorElement("password-conform") },
];

fields.forEach(({ input, error }) => {
    input.addEventListener("input", function (event) {
        if (input.validity.valid) {
            error.textContent = "";
            input.classList.remove(this.classList[0] + '_invalid');
            input.classList.add(this.classList[0] + '_valid');
        } else {
            showError(input, error);
            input.classList.remove(this.classList[0] + '_valid');
            input.classList.add(this.classList[0] + '_invalid');
        }

        if (input.id === "password-confirm") {
            const passwordInput = document.getElementById("password");
            if (passwordInput.value !== input.value) {
                error.textContent = "Passwords do not match";
                setErrorAlert(input, error, ".form-group");
                input.classList.remove(this.classList[0] + '_valid');
                input.classList.add(this.classList[0] + '_invalid');
            }
        }
    });
});

const checkbox = document.getElementById("checkbox");
const checkboxError = createErrorElement("checkbox");

checkbox.addEventListener("change", function (event) {
    if (checkbox.checked) {
        checkboxError.textContent = "";
    } else {
        checkboxError.textContent = "You must confirm your registration.";
    }
    setErrorAlert(checkbox, checkboxError, ".confirm");
});

form.addEventListener("submit", function (event) {
    let hasErrors = false;
    fields.forEach(({ input, error }) => {
        if (!input.validity.valid) {
            showError(input, error);
            input.classList.remove(input.classList[0] + '_valid');
            input.classList.add(input.classList[0] + '_invalid');
            hasErrors = true;
        }
        if (input.id === "password-confirm") {
            const passwordInput = document.getElementById("password");
            if (passwordInput.value !== input.value) {
                error.textContent = "Passwords do not match";
                setErrorAlert(input, error, ".form-group");
                input.classList.remove(this.classList[0] + '_valid');
                input.classList.add(this.classList[0] + '_invalid');
                hasErrors = true;
            }
        }
    });

    if (!checkbox.checked) {
        checkboxError.textContent = "You must confirm your registration.";
        setErrorAlert(checkbox, checkboxError, ".confirm");
        hasErrors = true;
    }

    if (hasErrors) {
        event.preventDefault();
    } else {
        for (const field of fields) {
            localStorage.setItem(field.input.id, field.input.value);
        }
        popup.style.display = "none";
        message.style.display = "block";
        event.preventDefault();
    }
});

function showError(input, errorElement) {
    if (input.validity.valueMissing) {
        errorElement.textContent = `${input.name} is a required field`;
    } else if (input.validity.typeMismatch) {
        errorElement.textContent = `Entered ${input.name} is incorrect`;
    } else if (input.validity.patternMismatch) {
        errorElement.textContent = `Entered ${input.name} is not in the correct format`;
    } else if (input.validity.tooLong) {
        errorElement.textContent = `${input.name} must be less than ${input.maxLength} characters`;
    } else if (input.validity.tooShort) {
        errorElement.textContent = `${input.name} must be more than ${input.minLength} characters`;
    }
    var formGroup = input.closest(".form-group");
    formGroup.appendChild(errorElement);
}

const passwordIcon = document.querySelectorAll(".pass-input__icon");

passwordIcon.forEach(function (icon) {
    icon.addEventListener("click", function () {
        const relatedPasswordInput = icon.previousElementSibling;

        if (relatedPasswordInput.type === "password") {
            relatedPasswordInput.type = "text";
        } else {
            relatedPasswordInput.type = "password";
        }
    });
});

function createErrorElement(id) {
    const errorElement = document.createElement("span");
    errorElement.className = "error-alert";
    errorElement.id = id + "-error";
    return errorElement;
}

function setErrorAlert(element, errorElement, parentClass) {
    var parent = element.closest(parentClass);
    parent.appendChild(errorElement);
}

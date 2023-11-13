const form = document.querySelector(".register-form");
const popup = document.querySelector(".popup");
const message = document.querySelector(".container__message");

const fields = [
    { input: document.getElementById("email"), error: document.querySelector("#email + span.error-alert") },
    { input: document.getElementById("full-name"), error: document.querySelector("#full-name + span.error-alert") },
    { input: document.getElementById("password"), error: document.querySelector(".pass-input + span.error-alert") },
    { input: document.getElementById("password-confirm"), error: document.querySelector(".pass-input + span.pass-confirm") },
];

fields.forEach(({ input, error }) => {
    input.addEventListener("input", function (event) {
        if (input.validity.valid) {
            error.textContent = "";
            error.className = "error-alert";
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
                error.className = "error-alert";
                input.classList.remove(this.classList[0] + '_valid');
                input.classList.add(this.classList[0] + '_invalid');
            }
        }
    });
});

const checkbox = document.getElementById("checkbox");
const checkboxError = document.querySelector(".check + span.error-alert");

checkbox.addEventListener("change", function (event) {
    if (checkbox.checked) {
        checkboxError.textContent = "";
        checkboxError.className = "error-alert";
    } else {
        checkboxError.textContent = "You must confirm your registration.";
        checkboxError.className = "error-alert";
    }
});

form.addEventListener("submit", function (event) {
    let hasErrors = false;
    fields.forEach(({ input, error }) => {
        if (!input.validity.valid) {
            showError(input, error);
            hasErrors = true;
        }
        if (input.id === "password-confirm") {
            const passwordInput = document.getElementById("password");
            if (passwordInput.value !== input.value) {
                error.textContent = "Passwords do not match";
                error.className = "error-alert";
                hasErrors = true;
            }
        }
    });

    if (!checkbox.checked) {
        checkboxError.textContent = "You must confirm your registration.";
        checkboxError.className = "error-alert";
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
    errorElement.className = "error-alert";
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

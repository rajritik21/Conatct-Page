//  function showinfor(){
//         document.getElementById("fullname-display").innerHTML = localStorage.getItem("fullName");

//     }
    
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    const fields = {
        fullName: document.getElementById("fullname"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        dob: document.getElementById("dob"),
        gender: document.getElementById("gender"),
        city: document.getElementById("city"),
        state: document.getElementById("state"),
        country: document.getElementById("country"),
        address: document.getElementById("address"),
        message: document.getElementById("message"),
        terms: document.getElementById("terms"),
        fileInput: document.getElementById("cv"),
        fileNameDisplay: document.getElementById("file-name-display")
    };

    // Auto-save as user types
    Object.keys(fields).forEach(key => {
        fields[key].addEventListener("input", () => {
            if (fields[key].type === "checkbox") {
                localStorage.setItem(key, fields[key].checked);
            } else {
                localStorage.setItem(key, fields[key].value.trim());
            }
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission until validation passes
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll(".error").forEach(el => el.remove());

        // Validation functions
        function showError(input, message) {
            const error = document.createElement("p");
            error.classList.add("error", "text-red-500", "text-sm");
            error.textContent = message;
            input.parentElement.appendChild(error);
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function validatePhone(phone) {
            return /^[0-9]{10}$/.test(phone);
        }

        function validateFileType(file) {
            const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
            const fileName = file.name.toLowerCase();
            return allowedExtensions.some(ext => fileName.endsWith(ext));
        }

        // Step-by-step validation

        // Personal Details
        if (!fields.fullName.value.trim()) { showError(fields.fullName, "Full name is required."); isValid = false; }
        if (!fields.dob.value.trim()) { showError(fields.dob, "Date of birth is required."); isValid = false; }
        if (!fields.gender.value.trim()) { showError(fields.gender, "Gender is required."); isValid = false; }

        // Contact Details
        if (!fields.email.value.trim() || !validateEmail(fields.email.value.trim())) {
            showError(fields.email, "Enter a valid email."); isValid = false;
        }
        if (!fields.phone.value.trim() || !validatePhone(fields.phone.value.trim())) {
            showError(fields.phone, "Enter a valid 10-digit phone number."); isValid = false;
        }

        // Location Details
        if (!fields.city.value.trim()) { showError(fields.city, "City is required."); isValid = false; }
        if (!fields.state.value.trim()) { showError(fields.state, "State is required."); isValid = false; }
        if (!fields.country.value.trim()) { showError(fields.country, "Country is required."); isValid = false; }
        if (!fields.address.value.trim()) { showError(fields.address, "Address is required."); isValid = false; }

        // Additional Details
        if (!fields.message.value.trim()) { showError(fields.message, "Message cannot be empty."); isValid = false; }
        if (!fields.terms.checked) { showError(fields.terms, "You must agree to the terms."); isValid = false; }
        if (fields.fileInput.files.length === 0) { 
            showError(fields.fileInput, "Please upload your CV/Resume."); 
            isValid = false; 
        } else if (!validateFileType(fields.fileInput.files[0])) {
            showError(fields.fileInput, "Only JPG, JPEG, PNG, or PDF files are allowed.");
            isValid = false;
        }

        if (isValid) {
            alert("Form submitted successfully!");
            form.submit(); // Proceed with form submission
        }
    });

    // Event listener to display selected file name
    const fileInput = document.getElementById("cv");
    const fileNameDisplay = document.getElementById("file-name-display");

    fileInput.addEventListener("change", function () {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
        } else {
            fileNameDisplay.textContent = "";
        }
    });
});

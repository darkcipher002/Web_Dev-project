document.addEventListener('DOMContentLoaded', () => {

    // 1. Requirement 8: Array & Object Data Structures
    const eventCatalog = [
        { name: 'Strathmore Tech Club Summit', maxPasses: 1 },
        { name: 'SU Cultural Night', maxPasses: 3 },
        { name: 'Sports Gala 2026', maxPasses: 3 }
    ];

    const formState = {
        fullName: '',
        admissionNo: '',
        selectedEvent: 'Strathmore Tech Club Summit',
        passes: 1
    };

    // DOM Element References
    const regForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('full_name');
    const admInput = document.getElementById('admission_number');
    const emailInput = document.getElementById('email');
    const facultyInput = document.getElementById('faculty');
    const passInput = document.getElementById('guest_passes');
    const notesInput = document.getElementById('special_needs');
    const charCounter = document.getElementById('char-counter');
    const statusMsg = document.getElementById('status-message');

    // Requirement 8: Reusable Function 1
    function isEmptyOrSpace(str) {
        return !str || str.trim().length === 0;
    }

    // Requirement 8: Reusable Function 2
    function isStrathmoreEmail(email) {
        return email.toLowerCase().trim().endsWith('@strathmore.edu');
    }

    // --- DOM Behavior 1: Live Character Counter (`input` Event) ---
    notesInput.addEventListener('input', (e) => {
        const remaining = 150 - e.target.value.length;
        charCounter.textContent = remaining;
    });

    // --- DOM Behavior 2 & 3: Dynamic Live Preview (`input` & `change` Events) ---
    function updatePreview() {
        formState.fullName = nameInput.value.trim();
        formState.admissionNo = admInput.value.trim();
        formState.passes = passInput.value;

        const selectedRadio = document.querySelector('input[name="event_name"]:checked');
        if (selectedRadio) {
            formState.selectedEvent = selectedRadio.value;
        }

        document.getElementById('prev-name').textContent = formState.fullName || '---';
        document.getElementById('prev-adm').textContent = formState.admissionNo || '---';
        document.getElementById('prev-event').textContent = formState.selectedEvent;
        document.getElementById('prev-passes').textContent = formState.passes || '1';
    }

    nameInput.addEventListener('input', updatePreview);
    admInput.addEventListener('input', updatePreview);
    passInput.addEventListener('input', updatePreview);
    document.querySelectorAll('input[name="event_name"]').forEach(radio => {
        radio.addEventListener('change', updatePreview);
    });

    // --- DOM Behavior 4: Multi-Rule Form Validation (`submit` Event) ---
    regForm.addEventListener('submit', (e) => {
        let isValid = true;
        
        // Reset Error Feedback UI
        statusMsg.className = 'status-box';
        statusMsg.textContent = '';
        document.querySelectorAll('.field-error').forEach(span => span.textContent = '');

        // Rule 1: Blank / Whitespace Check
        if (isEmptyOrSpace(nameInput.value)) {
            document.getElementById('error-full_name').textContent = 'Full Name is required.';
            isValid = false;
        }

        // Rule 2: Admission No Format Check (Regex)
        const admRegex = /^(\d{6}|[A-Z]{3,5}\/\d{5,6}\/\d{2})$/i;
        if (!admRegex.test(admInput.value.trim())) {
            document.getElementById('error-admission_number').textContent = 'Enter a valid Strathmore ID (e.g. 145689 or DBIT/12345/24).';
            isValid = false;
        }

        // Rule 3: Strathmore Email Domain Check
        if (!isStrathmoreEmail(emailInput.value)) {
            document.getElementById('error-email').textContent = 'Must use a valid @strathmore.edu student email.';
            isValid = false;
        }

        // Rule 4: Faculty Dropdown Check
        if (isEmptyOrSpace(facultyInput.value)) {
            document.getElementById('error-faculty').textContent = 'Please choose your faculty.';
            isValid = false;
        }

        // Rule 5: Related-Field Rule (Tech Summit Pass Constraint)
        const selectedRadio = document.querySelector('input[name="event_name"]:checked');
        const eventName = selectedRadio ? selectedRadio.value : '';
        const passesRequested = parseInt(passInput.value, 10);

        if (eventName === 'Strathmore Tech Club Summit' && passesRequested > 1) {
            document.getElementById('error-guest_passes').textContent = 'Tech Summit limits registrations to maximum 1 pass per student.';
            isValid = false;
        }

        // Rule 6: Number Range Rule
        if (isNaN(passesRequested) || passesRequested < 1 || passesRequested > 3) {
            document.getElementById('error-guest_passes').textContent = 'Passes must be between 1 and 3.';
            isValid = false;
        }

        // Block Submission if Invalid
        if (!isValid) {
            e.preventDefault();
            statusMsg.textContent = 'Please resolve the highlighted errors before submitting.';
            statusMsg.classList.add('active-error');
        }
    });
});

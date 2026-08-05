<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Sanitize Input Data
    $full_name = trim($_POST['full_name'] ?? '');
    $admission_number = trim($_POST['admission_number'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $faculty = trim($_POST['faculty'] ?? '');
    $event_name = trim($_POST['event_name'] ?? '');
    $guest_passes = (int)($_POST['guest_passes'] ?? 1);
    $special_needs = trim($_POST['special_needs'] ?? '');

    // Server-Side Guard
    if (empty($full_name) || empty($admission_number) || empty($email) || !str_ends_with(strtolower($email), '@strathmore.edu')) {
        die("Invalid form submission. Return to form and correct errors.");
    }

    // Prepared Statement Insertion
    $stmt = $conn->prepare("INSERT INTO registrations (full_name, admission_number, email, faculty, event_name, guest_passes, special_needs) VALUES (?, ?, ?, ?, ?, ?, ?)");
    
    $stmt->bind_param("sssssis", $full_name, $admission_number, $email, $faculty, $event_name, $guest_passes, $special_needs);

    if ($stmt->execute()) {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Registration Confirmed</title>
            <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
            <main>
                <section class="form-container">
                    <h2 style="color: #28a745;">Registration Confirmed!</h2>
                    <p>Thank you, <strong><?php echo htmlspecialchars($full_name); ?></strong> (<?php echo htmlspecialchars($admission_number); ?>).</p>
                    <p>Your registration for <strong><?php echo htmlspecialchars($event_name); ?></strong> has been recorded in the system.</p>
                    <a href="form.html" class="cta-button">Register Another Student</a>
                </section>
            </main>
        </body>
        </html>
        <?php
    } else {
        echo "Database Insertion Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    header("Location: form.html");
    exit();
}
?>
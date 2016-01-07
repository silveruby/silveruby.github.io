---
layout: default
title: Download  Sent
---
{% include navbar-default.html %}

<div class="container">
    <?php
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            // Checking For Blank Fields...
            if($_POST['email']==""){
                echo '<div class="content">
                        <h1>Uh-oh</h1>
                        <p class="lead">Please <a href="../index.html">go back</a> and make sure to enter an email address.</p>
                    </div>';
            }
            else{
                // Check if the "Sender's Email" input field is filled out
                $email=$_POST['email'];
                // Sanitize E-mail Address
                $email =filter_var($email, FILTER_SANITIZE_EMAIL);
                // Validate E-mail Address
                $email= filter_var($email, FILTER_VALIDATE_EMAIL);
                if (!$email){
                    echo '<div class="content">
                        <h1>Uh-oh</h1>
                        <p class="lead">Please <a href="../index.html">go back</a> and make sure to enter a validate email address.</p>
                        </div>';
                }
                else{
                    $subject = "Portfolio requested by " . $email;
                    $message = "n/a";
                    $headers = 'From:'. $email . "\r\n"; // Sender's Email
                    // Message lines should not exceed 70 characters (PHP rule), so wrap it
                    $message = wordwrap($message, 70);
                    // Send Mail By PHP Mail Function
                    mail('zhengsan@gmail.com', $subject, $message, $headers);

                    echo 
                    '<div class="content">
                        <h1>Thank you for reaching out!</h1>
                        <p class="lead">Here\'s my <a href="../portfolio/zheng-portfolio.pdf">portfolio (PDF)</a>. Please use password \'hello\' to view file.</p>                                            
                        <p class="lead"><a href="../index.html">Return to home</a></p>
                    </div>';
                }
            }
        }
    ?>
</div>
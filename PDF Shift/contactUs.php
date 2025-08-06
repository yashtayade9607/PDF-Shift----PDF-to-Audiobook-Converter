<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];

    $con = mysqli_connect('#','#','#','project') or die("connection failed");

    $sql = "INSERT INTO contact_us(name, email, subject, message) VALUES('{$name}','{$email}','{$subject}','{$message}')";

    $result = mysqli_query($con,$sql) or die("Query Failed");
    mysqli_close($con);
?>


<html>
  <head>
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    <!-- Favicons -->
    <link href="assets/img/favicons/favicon3.png" rel="icon">
  </head>
    <style>
      body {
        text-align: center;
        padding: 40px 0;
        background: #EBF0F5;
      }
      h1, #Goto-Home {
          color: #88B04B;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-weight: 900;
          margin-bottom: 10px;
          text-decoration: none;
          position: relative;
        }
        #Goto-Home:hover{
          color: #639a0f;
          text-decoration: underline;
        }
        h1{
          font-size: 40px;
        }
        p {
          color: #404F5E;
          font-family: "Nunito Sans", "Helvetica Neue", sans-serif;
          font-size:20px;
          margin: 0;
        }
      i {
        color: #9ABC66;
        font-size: 100px;
        line-height: 200px;
        margin-left:-15px;
      }
      .card {
        background: white;
        padding: 60px;
        border-radius: 4px;
        box-shadow: 0 2px 3px #C8D0D8;
        display: inline-block;
        margin: 0 auto;
      }
    </style>
    <body>
      <div class="card">
      <div style="border-radius:200px; height:200px; width:200px; background: #F8FAF5; margin:0 auto;">
        <i class="checkmark">✓</i>
      </div>
        <h1>Success</h1> 
        <p>We received your request;<br/> we'll be in touch shortly!</p>
      </div>
      <div class="goto-home-container">
      <h2><a href="index.php" id="Goto-Home">GoTo Home</a></h2>
      </div>
    </body>
</html>
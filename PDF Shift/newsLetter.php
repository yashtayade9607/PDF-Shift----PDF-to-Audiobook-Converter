<?php
    error_reporting(E_ERROR | E_PARSE);
    $email = $_POST["email"];

    $con = mysqli_connect('localhost','root','#','project') or die("connection failed");

    $verifyData = "SELECT email from newsletter WHERE email = '{$email}'";

    $verifyResult = mysqli_query($con,$verifyData) or die("Verification Failed");
    $row = mysqli_fetch_assoc($verifyResult);
    $cellValue = $row["email"];
    if($cellValue == $email)
    {
      $message = "You already subscribed to our newsletter";
    }
    else{
      $sql = "INSERT INTO newsletter(email) VALUES('{$email}')";
      $result = mysqli_query($con,$sql) or die("Query Failed");
      $message = "We received your request;<br/> we'll be in touch shortly!";
    }

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
        <p><?php echo $message; ?></p>


      </div>
      <div class="goto-home-container">
      <h2><a href="index.php" id="Goto-Home">GoTo Home</a></h2>
      </div>
    </body>
</html>
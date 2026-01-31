<?php
$name=$_POST["name"];
$email=$_POST["email"];
$subject=$_POST["subject"];
$message=$_POST["message"];


$cnx=new mysqli("localhost","ra7oox","Ra7oox@20232023","formdata");
if ($cnx->connect_error){
    die('connexion failed'.$cnx->connect_error);
}else{
    $cr=$cnx->prepare("insert into data(name,email,subject,message)values(?,?,?,?)");
    $cr->bind_param("ssss",$name,$email,$subject,$message);
    $cr->execute();
    $cr->close();
    $cnx->close();
}



?>
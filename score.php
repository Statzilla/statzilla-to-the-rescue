<?php

include 'connect.php';

if($_POST['score'] && $_POST['nickname']) {

$score = (int) myStrip($_POST['score']);
$nickname = substr(myStrip($_POST['nickname']),0, 15);

$q = "INSERT INTO rating (score, nickname) VALUES ('$score', '$nickname')";
$result = mysql_query($q) or die($q.'==='.mysql_error());

echo json_encode([
    'success' => 1
]);

} else {

}

?>
<?php

include_once 'Pusher.php';

$pusher = new Pusher(
	'f0e50ed6adb326441513', //APP KEY
	'2432acaf88c3986478d0', //APP SECRET
	'14949' //APP ID
);


//get the message posted by our ajax call
$message = $_POST['message'];

//trim and filter it
$message = trim(filter_var($message, FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES));


//trigger the 'new_message' event in our channel, 'presence-nettuts'
$pusher->trigger(
	'myChannel', //the channel
	'message', //the event
	array('message' => $message) //the data to send
);

//echo the success array for the ajax call
echo json_encode(array(
	'message' => $message,
	'success' => true
));
exit();
?>
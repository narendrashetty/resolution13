<?php
	include("../functions/config.php");
	include("../functions/class.entries.php");
	$e=new entries();
	$e->view_json($_POST['college']);
?>

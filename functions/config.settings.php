<?php

	# Create a new file called config.php in functions/ and dump and change the following settings

	$host = ""; # MySQL hostname; default: localhost
	$user = ""; # MySQL username; default: root
	$pwd = "";  # MySQL password
	$db = "";		# Set Your dbname; preferably: resolution13

	mysql_connect($host, $user, $pwd);
	mysql_select_db($db);

?>

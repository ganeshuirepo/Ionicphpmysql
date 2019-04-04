<?php
	 header("Access-Control-Allow-Origin: *");
	 
   // Define database connection parameters
   $hn      = 'localhost';
   $un      = 'root';
   $pwd     = 'ekalavya_lintech';
   $db      = 'circulardb';
   $cs      = 'utf8';

   // Set up the PDO parameters
   $dsn 	= "mysql:host=" . $hn . ";port=3306;dbname=" . $db . ";charset=" . $cs;
   $opt 	= array(
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                       );
   // Create a PDO instance (connect to the database)
   $pdo 	= new PDO($dsn, $un, $pwd, $opt);


   // Retrieve the posted data
   $json    =  file_get_contents('php://input');
   $obj     =  json_decode($json);
   //$key     =  strip_tags($obj->key);


   // Determine which mode is being requested
			
         // Sanitise URL supplied values
		  $employeeID = filter_var($obj->empid, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $oldPassword = filter_var($obj->oldpassword, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
          $newPassword = filter_var($obj->newpassword, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  
		  
		//	$newPassword = $obj['newpassword'];
		//	$oldPassword = $obj['oldpassword'];
         // Attempt to run PDO prepared statement
         try {
            $sql 	= "UPDATE employee_data_app SET password = :newpassword WHERE Emp_id= :empid AND password = :oldpassword";
            $stmt 	=	$pdo->prepare($sql);
			$stmt->bindParam(':oldpassword', $oldPassword, PDO::PARAM_STR);
            $stmt->bindParam(':newpassword', $newPassword, PDO::PARAM_STR);
			$stmt->bindParam(':empid', $employeeID, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode('Congratulations the record ' . $newPassword . ' was updated');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>

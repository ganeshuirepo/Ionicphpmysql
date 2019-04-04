<?php

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
		  $circularID = filter_var($obj->circularno, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $employeeID = filter_var($obj->empno, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $circularDate = filter_var($obj->circulardate, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		 
         try {
		 
            $sql = "INSERT INTO `favourits_circular`(`Circular_id`, `uploaded_emp_code`, `uploaded_date_time`) VALUES (:circularno, :empno, :circulardate)";
            $stmt 	=	$pdo->prepare($sql);
			$stmt->bindParam(':circularno', $circularID, PDO::PARAM_STR);
            $stmt->bindParam(':empno', $employeeID, PDO::PARAM_STR);
			$stmt->bindParam(':circulardate', $circularDate, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode('Congratulations employee details are registered');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>

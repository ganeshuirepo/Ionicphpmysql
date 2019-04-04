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

	date_default_timezone_set('Asia/Calcutta'); 
   // Determine which mode is being requested
			
         // Sanitise URL supplied values
		  $employeeID = filter_var($obj->empid, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
          $employeeName = filter_var($obj->empname, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $employeemobile = filter_var($obj->empmobile, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $employeeBranch = filter_var($obj->empbranch, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $employeeDOB = filter_var($obj->empdob, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
		  $registerdate = date("Y-m-d H:i:s");
		//	$newPassword = $obj['newpassword'];
		//	$oldPassword = $obj['oldpassword'];
         // Attempt to run PDO prepared statement
         try {
            $sql 	= "INSERT INTO `employee_data_app`(`Emp_id`, `Emp_name`, `mobile_no`, `Branch_no`, `dob`, `registration_date`) VALUES (:empid,:empname,:empmobile,:empbranch,:empdob,:registrationdate)";
            $stmt 	=	$pdo->prepare($sql);
			$stmt->bindParam(':empid', $employeeID, PDO::PARAM_STR);
            $stmt->bindParam(':empname', $employeeName, PDO::PARAM_STR);
			$stmt->bindParam(':empmobile', $employeemobile, PDO::PARAM_STR);
			$stmt->bindParam(':empbranch', $employeeBranch, PDO::PARAM_STR);
			$stmt->bindParam(':empdob', $employeeDOB, PDO::PARAM_STR);
			$stmt->bindParam(':registrationdate', $registerdate, PDO::PARAM_STR);
            $stmt->execute();

            echo json_encode('Congratulations employee details are registered');
         }
         // Catch any errors in running the prepared statement
         catch(PDOException $e)
         {
            echo $e->getMessage();
         }

?>

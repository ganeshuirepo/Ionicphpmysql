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
	
	$json    =  file_get_contents('php://input');
	$obj     =  json_decode($json);

	
	$employeeID = filter_var($obj->empno, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	$circularID = filter_var($obj->cirid, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
	
	$favdata = array();
   // Attempt to query database table and retrieve circular data for past 7 days.. 
   try {
      $stmt 	= $pdo->prepare('DELETE FROM `favourits_circular` WHERE uploaded_emp_code =:empno AND circular_id =:cirid');  
	  $stmt->bindParam(':empno', $employeeID, PDO::PARAM_STR);
	  $stmt->bindParam(':cirid', $circularID, PDO::PARAM_STR);
	  $stmt->execute();
	 

      // Return data as JSON
      echo json_encode("Congratulations favourite circular was deleted");
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>

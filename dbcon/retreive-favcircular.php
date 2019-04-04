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
	
	$favdata = array();
   // Attempt to query database table and retrieve circular data for past 7 days.. 
   try {
      $stmt 	= $pdo->prepare('SELECT * FROM `circular_data` as a,`favourits_circular` as b WHERE b.uploaded_emp_code =:empno AND a.Circular_no=b.circular_id');  
	  $stmt->bindParam(':empno', $employeeID, PDO::PARAM_STR);
	  $stmt->execute();
	  
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $favdata[] = $row;
      }

      // Return data as JSON
      echo json_encode($favdata);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>

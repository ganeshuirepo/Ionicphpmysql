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
			
			
	$selectedDept = filter_var($obj->selectDepart, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
    $selectedYear = filter_var($obj->selectyear, FILTER_SANITIZE_STRING, FILTER_FLAG_ENCODE_LOW);
   
	//$searchresult = array();
	
      // Attempt to query database table and retrieve circular data for 2017 circulars.. 
    try {
		if ($selectedDept == "Select Department") {
		$stmt 	= $pdo->prepare('SELECT * FROM circular_data WHERE YEAR(Circular_date)=:selectyear');
		$stmt->bindParam(':selectyear', $selectedYear);
            $stmt->execute();
		}
		else {
      $stmt 	= $pdo->prepare('SELECT * FROM circular_data WHERE YEAR(Circular_date)=:selectyear AND Circular_department=:selectDepart');
			$stmt->bindParam(':selectyear', $selectedYear);
			$stmt->bindParam(':selectDepart', $selectedDept);
            $stmt->execute();
		}
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
		
         // Assign each row of data to associative array
         $searchresult[] = $row;
      }
	  
	// Return data as JSON
      echo json_encode($searchresult);
   }
   
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }
   

?>

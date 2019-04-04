<?php
  header("Access-Control-Allow-Origin: *");
   // Define database connection parameters
    $hn      = 'localhost';
   $un      = 'root';
   $pwd     = '';
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
   $empdata    = array();

	// header("Access-Control-Allow-Origin: *");
	// header("Access-Control-Allow-Headers: X-Requested-With");

   // Attempt to query database table and retrieve data
   try {
      $stmt 	= $pdo->query('SELECT * FROM employee_data_app');
      while($row  = $stmt->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $empdata[] = $row;
      }

      // Return data as JSON
      echo json_encode($empdata);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }


?>

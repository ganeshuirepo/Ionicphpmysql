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
   $data    = array();
	
      // Attempt to query database table and retrieve circular data for past 30 days.. 

   try {
    $count 	= $pdo->query('SELECT COUNT(Circular_no) as circularmonthct FROM circular_data WHERE circular_date BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW()');
      while($item  = $count->fetch(PDO::FETCH_OBJ))
      {
         // Assign each row of data to associative array
         $monthdatacount[] = $item;
      }

      // Return data as JSON
      echo json_encode($monthdatacount);
   }
   catch(PDOException $e)
   {
      echo $e->getMessage();
   }

?>

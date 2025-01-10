<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group 1 - WebGIS</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h4>Hello World</h4>
    <button id='btn-test'>TEST</button>
    <script>
        $('#btn-test').click(function() {
            $.ajax({
                url: 'api/index.php',
                type: 'POST',
                data: {
                    functionName: 'test',
                },
                success: function(response) {
                    console.log('Response:', response);
                },
                error: function(xhr, status, error) {
                    alert('Error: ' + error);
                }
            });
        });
    </script>
</body>
</html>

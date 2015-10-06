<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>2 column Google maps, foursquare (outer scroll)</title>
    <meta name="generator" content="Bootply" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link href="css/styles.css" rel="stylesheet">
</head>
<body>

<div class="container-fluid">
    <div id="map-canvas"></div>
    <div class="row" id="spotInfo">
        <div class="row">
            <div class="col-md-6 itemImage">1</div>
            <div class="col-md-6 itemName">2</div>
        </div>
        <div class="row itemLocation">
            <div class="col-md-6 sized">Location: </div>
            <div class="col-md-6 itemLocationText"></div>
        </div>
        <div class="row itemInfo">
            <div class="col-md-6 sized">Information: </div>
            <div class="col-md-6 itemInfoText"></div>
        </div>
        <div class="row itemInfo">
            <p class="col-md-12 report">Report</p>
        </div>
    </div>

</div>


<!-- script references -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="http://maps.googleapis.com/maps/api/js?sensor=false&extension=.js&output=embed"></script>
<script src="js/gmaps.js"></script>
<script src="js/scripts.js"></script>
</body>
</html>
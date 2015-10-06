<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Location extends Model
{
    protected $table = "locations";

    protected static function getNearbyLocations($lat, $lon)
    {
        $max_radius = 5;
        $radius = 1;
        $locations = null;

        do {
            $locations = Location::select(DB::raw("*, (6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lon) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance"))
                ->having("distance", "<", $radius)
                ->orderBy("distance")
                ->setBindings([$lat, $lon, $lat])
                ->get();

            $radius++;
        } while (count($locations) == 0 && $radius <= $max_radius);

        return $locations;

    }

    protected static function getNearestLocation($lat, $lon){
        $locations = self::getNearbyLocations($lat, $lon);
        if(count($locations) > 0){
            return $locations[0];
        } else {
            return null;
        }
    }
}

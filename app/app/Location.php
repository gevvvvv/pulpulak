<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class Location extends Model
{
    protected $table = "locations";

    protected static function getNearbyLocations($lat, $lon)
    {
        $max_radius = 10;
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

        if(count($locations) > 0){
            foreach($locations as $location){
                $image_path = "/location_images/{$location->id}/image.jpg";
                $image_path_local = public_path() . DIRECTORY_SEPARATOR . 'location_images' . DIRECTORY_SEPARATOR . $location->id . DIRECTORY_SEPARATOR . 'image.jpg';
                if(file_exists($image_path_local)){
                    $location->image = $image_path;
                } else {
                    $location->image = null;
                }
            }
        }

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

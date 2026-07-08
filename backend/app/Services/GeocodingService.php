<?php

namespace App\Services;
use Illuminate\Support\Facades\Http;

class GeocodingService
{
    public function getCoordinates(string $address): ?array
    {
        $response = Http::withHeaders([
            'User-Agent' => 'AC Management System'
        ])->get('https://nominatim.openstreetmap.org/search', [

            'q' => $address,
            'format' => 'json',
            'limit' => 1,
            'addressdetails' => 1

        ]);

        $data = $response->json();

        if(empty($data)){
            return null;
        }

        return [
            'lat' => (float)$data[0]['lat'],
            'lng' => (float)$data[0]['lon']
        ];
    }
}
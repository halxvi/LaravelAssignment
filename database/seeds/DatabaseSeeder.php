<?php

use App\Facility;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('facilities')->insert([
            'facilityid' => 0,
            'facilityname' => '会議室1'
        ]);
        DB::table('facilities')->insert([
            'facilityid' => 0,
            'facilityname' => '会議室2'
        ]);
        DB::table('facilities')->insert([
            'facilityid' => 0,
            'facilityname' => '談話室'
        ]);
        DB::table('facilities')->insert([
            'facilityid' => 0,
            'facilityname' => 'コワーキングスペース1'
        ]);
        DB::table('facilities')->insert([
            'facilityid' => 0,
            'facilityname' => 'コワーキングスペース2'
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Facility;
use App\Reservation;
use Carbon\Carbon;

class MainController extends Controller
{

    function index(Request $request)
    {
        try {
            if ($request->input('date') == 'n/a') {
                $date = Carbon::now('Asia/Tokyo');
            } else {
                $date = Carbon::createFromDate($request->input('date'), 'Asia/Tokyo');
            }
            $dateNow = $date->format('Y-m-d');
            $monthDays = [];
            $yearMonthDays = [];
            $monthDays[0] = $date->format('m/d');
            $yearMonthDays[0] = $dateNow;
            for ($i = 1; $i < 7; $i++) {
                $monthDays[$i] = $date
                ->addDay()
                ->format('m/d');
                $yearMonthDays[$i] = $date->format('Y-m-d');
            }
            $status = [];
            $facilities = Facility::all();
            $facilitiesID = Facility::get('facilityid')->all();
            $reservations = Reservation::all();
            for ($i = 0; $i < Facility::count(); $i++) {
                for ($q = 0; $q < 7; $q++) {
                    if ($reservations->where('facilityid', $facilitiesID[$i]->facilityid)->where('date', $yearMonthDays[$q])->count() == 0) {
                        $status[$i][$q] = "○";
                    } else {
                        $reservationData = 0;
                        $reservationData = $reservations
                        ->where('facilityid', $facilitiesID[$i]->facilityid)
                        ->where('date', $yearMonthDays[$q])
                        ->where('userid', $request->input('userId'))
                        ->count();
                        if ($reservationData == 0) {
                            $status[$i][$q] = "-";
                        } else {
                            $status[$i][$q] = "×";
                        }
                    }
                }
            }
            return response()->json(compact('facilities', 'dateNow', 'monthDays', 'yearMonthDays', 'status', 'facilitiesID'));
        } catch (Exception $e) {
            report($e);
            abort('500');
        }
    }

    function reserve(Request $request)
    {
        try {
            $reservation = new Reservation();
            $reservation->id = 0;
            $reservation->userid = $request->input('userID');
            $reservation->facilityid = $request->input('facilityid');
            $reservation->date = $request->input('date');
            $reservation->save();
        } catch (Exception $e) {
            report($e);
            abort('500');
        }
    }

    function delete(Request $request)
    {
        try {
            $reservation = new Reservation();
            $date = $request->input('date');
            $facilityid = $request->input('facilityid');
            $reservation::where('date', $date)
            ->where('facilityid', $facilityid)
            ->delete();
        } catch (Exception $e) {
            report($e);
            abort('500');
        }
    }

    function pagenate(Request $request)
    {
        try {
            $date = new Carbon($request->input('date'), 'Asia/Tokyo');
            if ($request->input('mode') == "nextWeek") {
                $date->addWeek();
            } elseif ($request->input('mode') == "nextDay") {
                $date->addDay();
            } elseif ($request->input('mode') == "previousWeek") {
                $date->subWeek();
            } elseif ($request->input('mode') == "previousDay") {
                $date->subDay();
            }
            $date = $date->format('Y-m-d');
            return $date;
        } catch (Exception $e) {
            report($e);
            abort('500');
        }
    }
}

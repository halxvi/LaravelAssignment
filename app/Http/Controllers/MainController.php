<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Exception;
use App\Facility;
use App\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cookie;

class MainController extends Controller
{

    function index(Request $request)
    {
        try {
            if ($request->input('date') == 'none') {
                $date = Carbon::now('Asia/Tokyo');
            } else {
                $date = Carbon::createFromTimestamp($request->input('date'), 'Asia/Tokyo');
                // Cookie::queue('date', $date->format('Y-m-d'), 10);
            }
            $dateNow = $date->format('Y-m-d');
            $monthDays = [];
            $yearMonthDays = [];
            $monthDays[0] = $date->format('m/d');
            $yearMonthDays[0] = $dateNow;
            for ($i = 1; $i < 7; $i++) {
                $monthDays[$i] = $date->addDay()->format('m/d');
                $yearMonthDays[$i] = $date->format('Y/m/d');
            }
            $date->subweek();
            $status = [];
            $facilities = Facility::all();
            for ($i = 0; $i < Facility::count(); $i++) {
                for ($q = 0; $q < 7; $q++) {
                    if (Reservation::where('date', $yearMonthDays[$q])->where('facilityid', $i + 1)->exists()) {
                        $reservationData = Reservation::where('date', $yearMonthDays[$q])->where('facilityid', $i + 1)->where('userid', $request->input('userID'))->get();
                        if ($reservationData) {
                            $status[$i][$q] = "×";
                        } else {
                            $status[$i][$q] = "-";
                        }
                    } else {
                        $status[$i][$q] = "○";
                    }
                }
            }
            $statusCode = "200";
            return response()->json(compact('statusCode', 'facilities', 'dateNow', 'monthDays', 'yearMonthDays', 'status'));
        } catch (Exception $e) {
            $statusCode = "500";
            return response()->json(compact('statusCode'));
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
            $statusCode = "200";
            return response()->json(compact('statusCode'));
        } catch (Exception $e) {
            $statusCode = "500";
            return response()->json(compact('statusCode'));
        }
    }

    function delete(Request $request)
    {
        try {
            $reservation = new Reservation();
            $date = $request->input('date');
            $facilityid = $request->input('facilityid');
            $reservation::where('date', $date)->where('facilityid', $facilityid)->delete();
            $statusCode = "200";
            return response()->json(compact('statusCode'));
        } catch (Exception $e) {
            $statusCode = "500";
            return response()->json(compact('statusCode'));
        }
    }

    function pagenate(Request $request)
    {
        try {
            $date = new Carbon($request->input('date'), 'Asia/Tokyo');
            if ($request->input('parm') == "nextWeek") {
                $date->addWeek();
            } elseif ($request->input('parm') == "nextDay") {
                $date->addDay();
            } elseif ($request->input('parm') == "previousWeek") {
                $date->subWeek();
            } elseif ($request->input('parm') == "previousDay") {
                $date->subDay();
            }

            $date = $date->format('Y-m-d');
            $statusCode = "200";
            return response()->json(compact('statusCode', 'date'));
        } catch (Exception $e) {
            $statusCode = "500";
            return response()->json(compact('statusCode'));
        }
    }

    function logout()
    {
        try {
            Auth::logout();
            Session::flush();
            $statusCode = "200";
            return response()->json(compact('statusCode'));
        } catch (Exception $e) {
            $statusCode = "500";
            return response()->json(compact('statusCode'));
        }
    }
}

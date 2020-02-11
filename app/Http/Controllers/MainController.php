<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Facility;
use App\Reservation;
use Carbon\Carbon;

class MainController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    function index(Request $request)
    {
        if ($request->session()->has('date')) {
            $date = Carbon::createMidnightDate($request->session()->get('date')->toDateTimeString(), 'Asia/Tokyo');
        } else {
            $date = Carbon::now('Asia/Tokyo');
            $request->session()->put(['date' => $date]);
        }
        $dateNow = $date->format('Y-m-d');
        $weeks = [];
        $weekYears = [];
        $weeks[0] = $date->format('m/d');
        $weekYears[0] = $dateNow;
        for ($i = 1; $i < 7; $i++) {
            $weeks[$i] = $date->addDay()->format('m/d');
            $weekYears[$i] = $date->format('Y/m/d');
        }
        $status = [];
        $facilities = Facility::all();
        for ($i = 0; $i < Facility::count(); $i++) {
            $comparedFacilityId = $i + 1;
            for ($q = 0; $q < 7; $q++) {
                if (Reservation::where('date', $weekYears[$q])->where('facilityid', $comparedFacilityId)->exists()) {
                    $reservationData = Reservation::where('date', $weekYears[$q])->where('facilityid', $comparedFacilityId)->get();
                    if ($reservationData[0]->userid == Auth::id()) {
                        $status[$i][$q] = "×";
                    } else {
                        $status[$i][$q] = "-";
                    }
                } else {
                    $status[$i][$q] = "○";
                }
            }
        }
        return view('/main', compact('facilities', 'dateNow', 'weeks', 'weekYears', 'status'));
    }

    function reserve(Request $request)
    {
        $reservation = new Reservation();
        $reservation->id = 0;
        $reservation->userid = Auth::id();
        $reservation->facilityid = $request->input('facilityid');
        $reservation->date = $request->input('date');
        $reservation->save();
        return redirect('main');
    }

    function delete(Request $request)
    {
        $reservation = new Reservation();
        $date = $request->input('date');
        $facilityid = $request->input('facilityid');
        $reservation::where('date', $date)->where('facilityid', $facilityid)->delete();
        return redirect('main');
    }

    function pagenate(Request $request)
    {
        $parm = $request->input('parm');
        $date = Carbon::createMidnightDate($request->session()->get('date')->toDateTimeString(), 'Asia/Tokyo');
        if ($parm == "nextWeek") {
            $date->addWeek();
        } elseif ($parm == "nextDay") {
            $date->addDay();
        } elseif ($parm == "previousWeek") {
            $date->subWeek();
        } elseif ($parm == "previousDay") {
            $date->subDay();
        } else {
            $date = Carbon::createMidnightDate($parm, 'Asia/Tokyo');
        }
        $request->session()->put(['date' => $date]);
        return redirect('main');
    }

    function logout()
    {
        session()->flush();
        Auth::logout();
        return redirect('login');
    }
}

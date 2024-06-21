<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CompanyController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
        $this->middleware('super_admin')->only(['store']);
    }

    public function index(){
        $companies = Company::with('users')->get();
        
        return response()->json($companies);
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $company = new Company($validatedData);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('logos', 'public');
            $company->logo = $path;
        }

        $company->save();

        User::whereIn('id', $validatedData['user_ids'])->update(['company_id' => $company->id]);

        return response()->json(['message' => 'Company created successfully'], 201);
    }
}

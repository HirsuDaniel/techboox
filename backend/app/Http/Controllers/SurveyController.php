<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\SurveyQuestion;
use App\Models\SurveyResponse;

class SurveyController extends Controller
{
    public function getQuestions()
    {
        $questions = SurveyQuestion::with('answers')->get();
        return response()->json($questions);
    }

    public function submitResponses(Request $request)
    {
        $responses = $request->input('responses');

        foreach ($responses as $response) {
            SurveyResponse::create([
                'user_id' => Auth::id(),
                'survey_question_id' => $response['question_id'],
                'response' => $response['response']
            ]);
        }

        return response()->json(['message' => 'Survey responses saved successfully.']);
    }

    public function checkStatus(){

        $user = Auth::user();
        return response()->json(['completed' => $user->survey_completed]);
    }

}

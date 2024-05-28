<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SurveyQuestion;
use App\Models\SurveyAnswer;

class SurveyQuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $questions = [
            ['question' => 'Do you like frontend?', 'answers' => ['Yes', 'No']],
            ['question' => 'Do you like backend?', 'answers' => ['Yes', 'No']],
            ['question' => 'What is your favorite frontend framework?', 'answers' => ['Vuejs', 'Javascript', 'Angular', 'React']],
            ['question' => 'What is your favorite backend framework?', 'answers' => ['Laravel', 'Django', 'CodeIgniter', 'Lumen']]
        ];

        foreach ($questions as $q) {
            $question = SurveyQuestion::create(['question' => $q['question']]);
            foreach ($q['answers'] as $answer) {
                SurveyAnswer::create(['survey_question_id' => $question->id, 'answer' => $answer]);
            }
        }
    }
}

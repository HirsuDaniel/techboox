<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAnswer extends Model
{

    use HasFactory;

    protected $fillable = ['survey_question_id', 'answer'];

    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class);
    }
}

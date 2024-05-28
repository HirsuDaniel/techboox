<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'survey_question_id', 'response'];

    public function question()
    {
        return $this->belongsTo(SurveyQuestion::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CV extends Model
{
    use HasFactory;

    protected $fillable = [
        'personal_details',
        'experiences',
        'education',
        'skills',
        'image',
        'user_id',
    ];

    protected $casts = [
        'personal_details' => 'array',
        'experiences' => 'array',
        'education' => 'array',
        'skills' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

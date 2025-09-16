<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkEntry extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'hours',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pet extends Model
{
    protected $fillable = [
        'name',
        'species',
        'breed',
        'age',
        'gender',
        'description',
        'image_url',
        'size',
        'status',
        'location',
        'vaccinated',
        'sterilized',
        'characteristics'
    ];

    protected $casts = [
        'characteristics' => 'array',
        'vaccinated' => 'boolean',
        'sterilized' => 'boolean',
    ];

    public function adoptions(): HasMany
    {
        return $this->hasMany(Adoption::class);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'disponible');
    }

    public function scopeBySpecies($query, $species)
    {
        return $query->where('species', $species);
    }
}

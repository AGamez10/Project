<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Donation extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'donor_name',
        'donor_email',
        'message',
        'status',
        'payment_method',
        'transaction_id'
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completada');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pendiente');
    }
}

<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'tag' => $this->tag,
            'category_id' => $this->category_id,
            'completed' => $this->completed,
            'attach_url' => $this->attach_url,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
        ];
    }
}

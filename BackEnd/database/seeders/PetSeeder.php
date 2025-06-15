<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pet;

class PetSeeder extends Seeder
{
    public function run(): void
    {
        $pets = [
            [
                'name' => 'Max',
                'species' => 'perro',
                'breed' => 'Golden Retriever',
                'age' => 3,
                'gender' => 'macho',
                'description' => 'Max es un perro muy cariñoso y juguetón. Le encanta correr en el parque y jugar con niños.',
                'image_url' => 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
                'size' => 'grande',
                'location' => 'Bogotá',
                'vaccinated' => true,
                'sterilized' => true,
                'characteristics' => ['amigable', 'activo', 'obediente']
            ],
            [
                'name' => 'Luna',
                'species' => 'gato',
                'breed' => 'Siamés',
                'age' => 2,
                'gender' => 'hembra',
                'description' => 'Luna es una gata muy elegante y cariñosa. Le gusta dormir al sol y recibir mimos.',
                'image_url' => 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
                'size' => 'pequeño',
                'location' => 'Medellín',
                'vaccinated' => true,
                'sterilized' => true,
                'characteristics' => ['tranquila', 'cariñosa', 'independiente']
            ],
            [
                'name' => 'Rocky',
                'species' => 'perro',
                'breed' => 'Bulldog Francés',
                'age' => 1,
                'gender' => 'macho',
                'description' => 'Rocky es un cachorro muy enérgico y divertido. Le encanta jugar y hacer travesuras.',
                'image_url' => 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
                'size' => 'mediano',
                'location' => 'Cali',
                'vaccinated' => true,
                'sterilized' => false,
                'characteristics' => ['juguetón', 'enérgico', 'sociable']
            ],
            [
                'name' => 'Mia',
                'species' => 'gato',
                'breed' => 'Persa',
                'age' => 4,
                'gender' => 'hembra',
                'description' => 'Mia es una gata muy tranquila y elegante. Perfecta para un hogar silencioso.',
                'image_url' => 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400',
                'size' => 'pequeño',
                'location' => 'Barranquilla',
                'vaccinated' => true,
                'sterilized' => true,
                'characteristics' => ['tranquila', 'elegante', 'silenciosa']
            ],
            [
                'name' => 'Buddy',
                'species' => 'perro',
                'breed' => 'Labrador',
                'age' => 5,
                'gender' => 'macho',
                'description' => 'Buddy es un perro muy leal y protector. Ideal para familias con niños.',
                'image_url' => 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400',
                'size' => 'grande',
                'location' => 'Cartagena',
                'vaccinated' => true,
                'sterilized' => true,
                'characteristics' => ['leal', 'protector', 'familiar']
            ]
        ];

        foreach ($pets as $pet) {
            Pet::create($pet);
        }
    }
}
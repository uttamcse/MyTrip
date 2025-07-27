# MyTrip 🌍

MyTrip is a **travel planning web application** that allows users to plan trips, explore top tourist destinations, and manage hotel bookings. It provides an API backend built with **Node.js, Express, and MongoDB**, and a frontend powered by **React** for an interactive user experience.

---

## 🚀 Features

- 🗺️ **Trip Planning** – Create and manage your trips effortlessly.
- 🏨 **Hotel Management** – Find and manage hotel options.
- 📍 **Top Tourist Places** – Explore must-visit locations in different cities.
- 🖼️ **Image Uploads** – Upload and manage images for destinations (supports Google Cloud Storage).
- 🔒 **Authentication & Authorization** – Secure login and user management (JWT-based).
- 📡 **RESTful API** – Well-structured API for integration with frontend and third-party apps.

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS (or CSS framework)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB  
**Authentication:** JWT  
**Storage:** Google Cloud Storage (for image uploads)  

---

## 📂 Folder Structure

```bash
MyTrip/
├── backend/              # Express API code
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   ├── config/           # DB and environment config
│   └── server.js         # App entry point
├── frontend/             # React app code
│   ├── src/
│   └── public/
├── .env                  # Environment variables
└── package.json          # Project metadata


## Install dependencies

##frontend 
cd frontend
npm create vite@latest ./
npm run dev

##backend 
cd backend
npm init -y
npm run start

## Search city
## Request 
curl --location 'http://localhost:8080/search?city=pur'

##Response

{
    "success": true,
    "message": "Found 2 trip(s) in pur",
    "trips": [
        {
            "_id": "6881dd40acc0a729b65e37ff",
            "title": "Royal Heritage Tour of Udaipur",
            "city": "Udaipur",
            "duration": 4,
            "price": 444,
            "description": "Explore the white City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        },
        {
            "_id": "6881e2229a85554444c458e9",
            "title": "Royal Heritage Tour of Jaipur",
            "city": "Jaipur",
            "duration": 4,
            "price": 444,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        }
    ]
}


## Add Trips

##request

curl --location 'http://localhost:8080/trips' \
--form 'title="Royal Heritage Tour of Goa"' \
--form 'city="Goa"' \
--form 'duration="3"' \
--form 'price="5555"' \
--form 'description="Explore the Pink City'\''s palaces, forts, and vibrant bazaars on this 3-day royal escape."'

##Response

{
    "success": true,
    "message": "Trip created successfully.",
    "trip": {
        "title": "Royal Heritage Tour of Goa",
        "city": "Goa",
        "duration": 3,
        "price": 5555,
        "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
        "image": "",
        "_id": "688644f20dffd1136a8aab50",
        "createdAt": "2025-07-27T15:25:38.189Z",
        "updatedAt": "2025-07-27T15:25:38.189Z",
        "__v": 0
    }
}

## Get Trips 

## Request 

curl --location --request GET 'http://localhost:8080/trips' \
--form 'title="Royal Heritage Tour of Udaipur"' \
--form 'city="Udaipur"' \
--form 'duration="4"' \
--form 'price="444"' \
--form 'description="Explore the white City'\''s palaces, forts, and vibrant bazaars on this 3-day royal escape."'

##Response

{
    "success": true,
    "currentPage": 1,
    "totalPages": 1,
    "totalTrips": 5,
    "trips": [
        {
            "_id": "688644f20dffd1136a8aab50",
            "title": "Royal Heritage Tour of Goa",
            "city": "Goa",
            "duration": 3,
            "price": 5555,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": ""
        },
        {
            "_id": "68860799ec01240b6c8953d3",
            "title": "Beaches Tour of Goa",
            "city": "Goa",
            "duration": 3,
            "price": 5555,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        },
        {
            "_id": "68860775ec01240b6c8953d1",
            "title": "Royal Palace Tour of Mysore",
            "city": "Mysore",
            "duration": 4,
            "price": 444,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        },
        {
            "_id": "6881e2229a85554444c458e9",
            "title": "Royal Heritage Tour of Jaipur",
            "city": "Jaipur",
            "duration": 4,
            "price": 444,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        },
        {
            "_id": "6881dd40acc0a729b65e37ff",
            "title": "Royal Heritage Tour of Udaipur",
            "city": "Udaipur",
            "duration": 4,
            "price": 444,
            "description": "Explore the white City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png"
        }
    ]
}

##Post Hotel 
## Request 

curl --location 'http://localhost:8080/hotels' \
--form 'name="Rambagh Palace Hotel"' \
--form 'pricePerNight="99999"' \
--form 'description="A luxurious stay in the heart of Jaipur with modern amenities and traditional charm."' \
--form 'rating="4.9"'

##Response 

{
    "success": true,
    "message": "Hotel created successfully.",
    "hotel": {
        "name": "Rambagh Palace Hotel",
        "pricePerNight": 99999,
        "rating": 4.9,
        "image": "",
        "description": "A luxurious stay in the heart of Jaipur with modern amenities and traditional charm.",
        "_id": "688645a10dffd1136a8aab54",
        "createdAt": "2025-07-27T15:28:33.525Z",
        "updatedAt": "2025-07-27T15:28:33.525Z",
        "__v": 0
    }
}

##Get Hotels

##request

curl --location 'http://localhost:8080/hotels'

##Response

{
    "success": true,
    "total": 4,
    "page": 1,
    "pages": 1,
    "hotels": [
        {
            "_id": "6881f85f156fac0377a62523",
            "name": "Royal Palace Hotel",
            "pricePerNight": 45653,
            "rating": 4.7,
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png",
            "description": "A luxurious stay in the heart of Jaipur with modern amenities and traditional charm."
        },
        {
            "_id": "6881f87a156fac0377a62525",
            "name": "Rambagh Palace Hotel",
            "pricePerNight": 99888,
            "rating": 4.9,
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png",
            "description": "A luxurious stay in the heart of Jaipur with modern amenities and traditional charm."
        },
        {
            "_id": "6885bf1bb71995143b77554f",
            "name": "Rambagh Palace Hotel",
            "pricePerNight": 99999,
            "rating": 4.9,
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png",
            "description": "A luxurious stay in the heart of Jaipur with modern amenities and traditional charm."
        },
        {
            "_id": "688645a10dffd1136a8aab54",
            "name": "Rambagh Palace Hotel",
            "pricePerNight": 99999,
            "rating": 4.9,
            "image": "",
            "description": "A luxurious stay in the heart of Jaipur with modern amenities and traditional charm."
        }
    ]
}

##Post Site Attraction 
##Request 


curl --location 'http://localhost:8080/top-places' \
--form 'description="It stands as a symbol of Jaipur’s royal heritage and is one of the most photographed monuments in India."' \
--form 'locationName="Hawa Mahal"'

##Responce

{
    "success": true,
    "message": "Top tourist place created successfully.",
    "place": {
        "image": "",
        "description": "It stands as a symbol of Jaipur’s royal heritage and is one of the most photographed monuments in India.",
        "locationName": "Hawa Mahal",
        "_id": "6886465f0dffd1136a8aab58",
        "createdAt": "2025-07-27T15:31:43.640Z",
        "updatedAt": "2025-07-27T15:31:43.640Z",
        "__v": 0
    }
}

##Get Site Attraction
##Requets

curl --location --request GET 'http://localhost:8080/top-places/688215005814a3b1d84a6423' \
--form 'description="It stands as a symbol of Jaipur’s royal heritage and is one of the most photographed monuments in India."' \
--form 'locationName="Hawa Mahal"'

## Response

{
    "success": true,
    "message": "Top tourist place fetched successfully.",
    "place": {
        "_id": "688215005814a3b1d84a6423",
        "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png",
        "description": "It stands as a symbol of Jaipur’s royal heritage and is one of the most photographed monuments in India.",
        "locationName": "Hawa Mahal,Jaipur",
        "createdAt": "2025-07-24T11:12:00.416Z",
        "updatedAt": "2025-07-24T11:13:20.023Z",
        "__v": 0
    }
}

##ChatBot
##Request

curl --location 'http://localhost:8080/chatbot' \
--header 'Content-Type: application/json' \
--data '{"message": "Show me Trips to Goa"}'

##Response


{
    "success": true,
    "message": "Trips to goa",
    "data": [
        {
            "_id": "68860799ec01240b6c8953d3",
            "title": "Beaches Tour of Goa",
            "city": "Goa",
            "duration": 3,
            "price": 5555,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "https://storage.googleapis.com/investsense_cloudbuild/{B2ED7D69-1955-4840-BC37-14DF0A348737}.png",
            "createdAt": "2025-07-27T11:03:53.595Z",
            "updatedAt": "2025-07-27T11:03:53.595Z",
            "__v": 0
        },
        {
            "_id": "688644f20dffd1136a8aab50",
            "title": "Royal Heritage Tour of Goa",
            "city": "Goa",
            "duration": 3,
            "price": 5555,
            "description": "Explore the Pink City's palaces, forts, and vibrant bazaars on this 3-day royal escape.",
            "image": "",
            "createdAt": "2025-07-27T15:25:38.189Z",
            "updatedAt": "2025-07-27T15:25:38.189Z",
            "__v": 0
        }
    ]
}



// const exampleString='"id":1,"checkIn":"2023-02-02","checkOut":"2023-02-04"'

// const obj = JSON.parse('{"name":"John", "age":30, "city":"New York"}');



const exampleBooking = JSON.parse('{"id":1, "checkIn": "2023-02-02", "checkOut": "2023-02-04", "product": {"id": 3,    "name": "Casa Allende",    "title": "Casa de vacaciones en las Sierras de Córdoba!",    "description": "Hermosa Casa de Veraneo en el balneario mas importante de Villa Carlos Paz! Está a unas pocas cuadras del río San Antonio, el bado de tala huasi o el río de Icho Cruz. A 10 de Carlos Paz, y a pocas cuadras de la calle principal del pueblo.",    "address": "villa allende", "roomNumber": 3,    "numberOfBathrooms": 2,    "category": {      "id": 2,      "title": "Casas",      "description": "36.670 casas disponibles",      "imageUrl": "/img/categories/casas.jpeg"    },    "city": {      "id": 2,      "city": "Córdoba",      "country": "Argentina"    }  }}')

export default exampleBooking;

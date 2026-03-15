// Simple logic for the blog

document.addEventListener("DOMContentLoaded", () => {
    
    // Add logic for opening up Recipe details when clicking on 'Read More' in recipes.html
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    readMoreButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const parentCard = e.target.closest('.blog-card');
            const details = parentCard.querySelector('.recipe-details');
            
            if(details) {
                const isOpen = details.classList.contains('open');

                // Close all others
                document.querySelectorAll('.recipe-details').forEach(d => {
                    d.classList.remove('open');
                });
                document.querySelectorAll('.read-more-btn').forEach(b => {
                    b.innerHTML = 'View Cooking Instructions &rarr;';
                });

                // If the clicked one wasn't open, open it
                if(!isOpen) {
                    details.classList.add('open');
                    e.target.innerHTML = 'Close Instructions &uarr;';
                }
            }
        });
    });
});

// Category filtering logic for Recipes page
function filterRecipes(category, element) {
    if(!element) return;
    
    // Update active tab styling
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    // Filter cards
    const items = document.querySelectorAll('.recipe-item');
    items.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
        } else {
            if (item.classList.contains(category)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });
}


// Interactive Map Logic (Leaflet.js)
document.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Center on Malaysia, zoom level 5 to show both Peninsular and Borneo
    const map = L.map('map').setView([4.2105, 108.9758], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const locations = [
        {
            name: "Penang",
            coords: [5.4141, 100.3288],
            food: "Asam Laksa & Char Kway Teow",
            desc: "The street food capital. Famous for its tangy, fish-based Asam Laksa and smoky Wok-fried noodles."
        },
        {
            name: "Kelantan",
            coords: [6.1254, 102.2381],
            food: "Nasi Kerabu",
            desc: "Known for Nasi Kerabu, a visually striking blue rice dish colored with butterfly pea flowers."
        },
        {
            name: "Malacca (Melaka)",
            coords: [2.1960, 102.2405],
            food: "Nyonya Kuih & Chicken Rice Balls",
            desc: "The historical state famous for Peranakan heritage desserts and unique hand-rolled chicken-flavored rice balls."
        },
        {
            name: "Sarawak",
            coords: [2.55, 113.0],
            food: "Sarawak Laksa & Kolo Mee",
            desc: "A distinct flavor profile driven by Sarawak black pepper. Famous for its breakfast staple, Kolo Mee."
        },
        {
            name: "Sabah",
            coords: [5.9788, 116.0753],
            food: "Hinava & Tuaran Mee",
            desc: "Rich in indigenous flavors and seafood. Hinava is a traditional Kadazan-Dusun dish of raw fish marinated in citrus."
        }
    ];

    // Define a custom circular marker icon
    const customIcon = L.divIcon({
        className: 'custom-circle-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
    });

    locations.forEach(loc => {
        const popupContent = `
            <div style="font-family: inherit;">
                <h3 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 1.2rem;">${loc.name}</h3>
                <h4 style="margin: 0 0 5px 0; color: #0a5c48;">${loc.food}</h4>
                <p style="margin: 0; font-size: 0.9em; color: #666; line-height: 1.4;">${loc.desc}</p>
            </div>
        `;
        L.marker(loc.coords, {icon: customIcon}).addTo(map).bindPopup(popupContent);
    });
});
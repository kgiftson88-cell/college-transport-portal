// Data source for Bus Routes & Pickup Points
const transportData = [
    {
        busNo: "Bus 01",
        routeName: "Katpadi Route",
        startPoint: "Katpadi Junction",
        destination: "Voorhees College Campus",
        departureTime: "07:45 AM",
        stops: ["Katpadi Junction", "Chittoor Bus Stand", "Old Bus Stand", "Voorhees Campus"],
        driverName: "Mr. K. Ramesh",
        contact: "+91 98765 43210"
    },
    {
        busNo: "Bus 02",
        routeName: "Sathuvachari Route",
        startPoint: "Sathuvachari Phase 2",
        destination: "Voorhees College Campus",
        departureTime: "07:50 AM",
        stops: ["Sathuvachari Phase 2", "RTO Office", "CMC Hospital", "Voorhees Campus"],
        driverName: "Mr. S. Suresh",
        contact: "+91 98765 43211"
    },
    {
        busNo: "Bus 03",
        routeName: "Bagayam Route",
        startPoint: "Bagayam Bus Terminus",
        destination: "Voorhees College Campus",
        departureTime: "07:40 AM",
        stops: ["Bagayam Terminus", "Thorapadi", "Otteri", "Voorhees Campus"],
        driverName: "Mr. M. Vijay",
        contact: "+91 98765 43212"
    },
    {
        busNo: "Bus 04",
        routeName: "Ranipet Route",
        startPoint: "Ranipet Bus Stand",
        destination: "Voorhees College Campus",
        departureTime: "07:15 AM",
        stops: ["Ranipet Stand", "Walajah Road", "Silk Mill", "Voorhees Campus"],
        driverName: "Mr. A. John",
        contact: "+91 98765 43213"
    }
];

const pickupPointsData = [
    { location: "Katpadi Junction", busNo: "Bus 01", morningTime: "07:45 AM", eveningTime: "04:30 PM" },
    { location: "Chittoor Bus Stand", busNo: "Bus 01", morningTime: "08:00 AM", eveningTime: "04:15 PM" },
    { location: "Sathuvachari Phase 2", busNo: "Bus 02", morningTime: "07:50 AM", eveningTime: "04:35 PM" },
    { location: "CMC Hospital Junction", busNo: "Bus 02", morningTime: "08:10 AM", eveningTime: "04:15 PM" },
    { location: "Bagayam Terminus", busNo: "Bus 03", morningTime: "07:40 AM", eveningTime: "04:40 PM" },
    { location: "Thorapadi", busNo: "Bus 03", morningTime: "07:55 AM", eveningTime: "04:25 PM" },
    { location: "Silk Mill", busNo: "Bus 04", morningTime: "07:35 AM", eveningTime: "04:45 PM" }
];

// DOM Elements
const routesTableBody = document.getElementById("routesTableBody");
const pickupsTableBody = document.getElementById("pickupsTableBody");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");
const routeModal = document.getElementById("routeModal");
const closeModal = document.getElementById("closeModal");

// Initialize Tables on Page Load
document.addEventListener("DOMContentLoaded", () => {
    renderRoutesTable(transportData);
    renderPickupsTable(pickupPointsData);
});

// Render Bus Routes Table
function renderRoutesTable(routes) {
    routesTableBody.innerHTML = "";
    if (routes.length === 0) {
        routesTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No matching routes found.</td></tr>`;
        return;
    }

    routes.forEach(route => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><strong>${route.busNo}</strong></td>
            <td>${route.routeName}</td>
            <td>${route.startPoint}</td>
            <td>${route.destination}</td>
            <td>${route.departureTime}</td>
            <td><button class="btn-view" onclick="openRouteDetails('${route.busNo}')">View Details</button></td>
        `;
        routesTableBody.appendChild(row);
    });
}

// Render Pickup Points Table
function renderPickupsTable(pickups) {
    pickupsTableBody.innerHTML = "";
    if (pickups.length === 0) {
        pickupsTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No matching pickup points found.</td></tr>`;
        return;
    }

    pickups.forEach(pickup => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${pickup.location}</td>
            <td><strong>${pickup.busNo}</strong></td>
            <td>${pickup.morningTime}</td>
            <td>${pickup.eveningTime}</td>
        `;
        pickupsTableBody.appendChild(row);
    });
}

// Interactive Feature 1: Real-time Dynamic Search/Filter
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();

    // Filter Routes
    const filteredRoutes = transportData.filter(route => 
        route.busNo.toLowerCase().includes(query) ||
        route.routeName.toLowerCase().includes(query) ||
        route.startPoint.toLowerCase().includes(query)
    );

    // Filter Pickups
    const filteredPickups = pickupPointsData.filter(pickup => 
        pickup.location.toLowerCase().includes(query) ||
        pickup.busNo.toLowerCase().includes(query)
    );

    renderRoutesTable(filteredRoutes);
    renderPickupsTable(filteredPickups);
});

// Clear Search Input
clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderRoutesTable(transportData);
    renderPickupsTable(pickupPointsData);
});

// Interactive Feature 2: Modal Popup Details
function openRouteDetails(busNo) {
    const route = transportData.find(b => b.busNo === busNo);
    if (!route) return;

    document.getElementById("modalBusTitle").innerText = `${route.busNo} - ${route.routeName}`;
    
    const detailsContent = document.getElementById("modalDetailsContent");
    detailsContent.innerHTML = `
        <p><strong>Starting Point:</strong> ${route.startPoint}</p>
        <p><strong>Destination:</strong> ${route.destination}</p>
        <p><strong>Departure Time:</strong> ${route.departureTime}</p>
        <p><strong>Driver Name:</strong> ${route.driverName}</p>
        <p><strong>Driver Contact:</strong> ${route.contact}</p>
        <br>
        <p><strong>All Key Stops:</strong></p>
        <ul>
            ${route.stops.map(stop => `<li>${stop}</li>`).join("")}
        </ul>
    `;

    routeModal.style.display = "flex";
}

// Close Modal Feature
closeModal.addEventListener("click", () => {
    routeModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === routeModal) {
        routeModal.style.display = "none";
    }
});
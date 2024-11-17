"use server";
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

async function getLatLngFromAddress(address, options = {}) {
    const geocodeResult = await geocodeAddress(address, options);

    if (geocodeResult.status === "OK" && geocodeResult.results.length > 0) {
        return geocodeResult.results[0].geometry.location;
    } else {
        console.error("Geocoding failed:", geocodeResult.status);
        return null;
    }
}



async function geocodeAddress(address, options = {}) {
    const { bounds, region, components, language, extraComputations } = options;

    if (!GOOGLE_MAPS_API_KEY) {
        console.error("Google Maps API key is missing. Set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in your .env.local file.");
        return { status: "REQUEST_DENIED", results: [] };
    }

    let url = `https://maps.googleapis.com/maps/api/geocode/json?key=${GOOGLE_MAPS_API_KEY}`;

    if (address) {
        url += `&address=${encodeURIComponent(address)}`;
    } else if (components) {
        url += `&components=${encodeURIComponent(components)}`;
    } else {
        console.error("Either 'address' or 'components' must be provided.");
        return { status: "INVALID_REQUEST", results: [] };
    }

    if (bounds) {
        url += `&bounds=${encodeURIComponent(bounds)}`;
    }
    if (region) {
        url += `®ion=${region}`;
    }
    if (language) {
        url += `&language=${language}`;
    }

    if (extraComputations) {
        if (Array.isArray(extraComputations)) {
            extraComputations.forEach(computation => {
                url += `&extra_computations=${computation}`;
            })
        } else {
            url += `&extra_computations=${extraComputations}`;
        }
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Geocoding error:", error);
        return { status: "UNKNOWN_ERROR", results: [] };
    }
}

export { getLatLngFromAddress };
import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapPin,
  Search,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
  Compass,
} from 'lucide-react'

/* ─────────────────────────────────────────────
   SERVICE HUB COORDINATES (KADAWATHA)
───────────────────────────────────────────── */
export const COLOMBO_HUB = {
  lat: 7.0061,
  lng: 79.9576,
  label: 'Safeguard Service Hub (Kadawatha)',
  address: '14/1/A, Kandy Road, Kadawatha, Sri Lanka',
  shortAddress: '14/1/A, Kandy Rd, Kadawatha',
  town: 'Kadawatha',
  district: 'Gampaha',
  province: 'Western Province',
}

/* ─────────────────────────────────────────────
   HAVERSINE DISTANCE FORMULA (KM)
───────────────────────────────────────────── */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371 // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c * 10) / 10
}

/* ─────────────────────────────────────────────
   SRI LANKA TOWNS DATABASE
───────────────────────────────────────────── */
export const SRI_LANKA_LOCATIONS = [
  // Colombo District (Western Province)
  { name: 'Colombo Fort / CBD', district: 'Colombo', province: 'Western Province', lat: 6.9344, lng: 79.8428 },
  { name: 'Kollupitiya (Colombo 03)', district: 'Colombo', province: 'Western Province', lat: 6.9056, lng: 79.8519 },
  { name: 'Bambalapitiya (Colombo 04)', district: 'Colombo', province: 'Western Province', lat: 6.8926, lng: 79.8569 },
  { name: 'Havelock Town / Wellawatte', district: 'Colombo', province: 'Western Province', lat: 6.8741, lng: 79.8606 },
  { name: 'Cinnamon Gardens (Colombo 07)', district: 'Colombo', province: 'Western Province', lat: 6.9117, lng: 79.8694 },
  { name: 'Borella (Colombo 08)', district: 'Colombo', province: 'Western Province', lat: 6.9147, lng: 79.8778 },
  { name: 'Dematagoda (Colombo 09)', district: 'Colombo', province: 'Western Province', lat: 6.9328, lng: 79.8803 },
  { name: 'Maradana (Colombo 10)', district: 'Colombo', province: 'Western Province', lat: 6.9292, lng: 79.8672 },
  { name: 'Rajagiriya', district: 'Colombo', province: 'Western Province', lat: 6.9083, lng: 79.8972 },
  { name: 'Nawala', district: 'Colombo', province: 'Western Province', lat: 6.8936, lng: 79.8872 },
  { name: 'Nugegoda', district: 'Colombo', province: 'Western Province', lat: 6.8649, lng: 79.8997 },
  { name: 'Kohuwala', district: 'Colombo', province: 'Western Province', lat: 6.8583, lng: 79.8889 },
  { name: 'Dehiwala', district: 'Colombo', province: 'Western Province', lat: 6.8533, lng: 79.8656 },
  { name: 'Mount Lavinia', district: 'Colombo', province: 'Western Province', lat: 6.8344, lng: 79.8653 },
  { name: 'Ratmalana', district: 'Colombo', province: 'Western Province', lat: 6.8197, lng: 79.8822 },
  { name: 'Moratuwa', district: 'Colombo', province: 'Western Province', lat: 6.7730, lng: 79.8816 },
  { name: 'Battaramulla', district: 'Colombo', province: 'Western Province', lat: 6.8986, lng: 79.9192 },
  { name: 'Pelawatta', district: 'Colombo', province: 'Western Province', lat: 6.8911, lng: 79.9317 },
  { name: 'Sri Jayawardenepura Kotte', district: 'Colombo', province: 'Western Province', lat: 6.8906, lng: 79.9011 },
  { name: 'Maharagama', district: 'Colombo', province: 'Western Province', lat: 6.8480, lng: 79.9265 },
  { name: 'Pannipitiya', district: 'Colombo', province: 'Western Province', lat: 6.8456, lng: 79.9547 },
  { name: 'Kottawa', district: 'Colombo', province: 'Western Province', lat: 6.8419, lng: 79.9658 },
  { name: 'Homagama', district: 'Colombo', province: 'Western Province', lat: 6.8433, lng: 80.0031 },
  { name: 'Malabe', district: 'Colombo', province: 'Western Province', lat: 6.9042, lng: 79.9547 },
  { name: 'Kaduwela', district: 'Colombo', province: 'Western Province', lat: 6.9347, lng: 79.9839 },
  { name: 'Athurugiriya', district: 'Colombo', province: 'Western Province', lat: 6.8719, lng: 79.9886 },
  { name: 'Piliyandala', district: 'Colombo', province: 'Western Province', lat: 6.8017, lng: 79.9228 },
  { name: 'Kesbewa', district: 'Colombo', province: 'Western Province', lat: 6.7869, lng: 79.9489 },
  { name: 'Kolonnawa', district: 'Colombo', province: 'Western Province', lat: 6.9372, lng: 79.8931 },
  { name: 'Padukka', district: 'Colombo', province: 'Western Province', lat: 6.8483, lng: 80.1039 },
  { name: 'Hanwella', district: 'Colombo', province: 'Western Province', lat: 6.8953, lng: 80.0828 },
  { name: 'Avissawella', district: 'Colombo', province: 'Western Province', lat: 6.9539, lng: 80.2106 },

  // Gampaha District (Western Province)
  { name: 'Kelaniya', district: 'Gampaha', province: 'Western Province', lat: 6.9553, lng: 79.9228 },
  { name: 'Peliyagoda', district: 'Gampaha', province: 'Western Province', lat: 6.9647, lng: 79.8894 },
  { name: 'Wattala', district: 'Gampaha', province: 'Western Province', lat: 6.9897, lng: 79.8922 },
  { name: 'Hendala', district: 'Gampaha', province: 'Western Province', lat: 6.9933, lng: 79.8789 },
  { name: 'Kiribathgoda', district: 'Gampaha', province: 'Western Province', lat: 6.9797, lng: 79.9286 },
  { name: 'Kadawatha', district: 'Gampaha', province: 'Western Province', lat: 7.0019, lng: 79.9519 },
  { name: 'Mahara', district: 'Gampaha', province: 'Western Province', lat: 7.0167, lng: 79.9333 },
  { name: 'Ragama', district: 'Gampaha', province: 'Western Province', lat: 7.0278, lng: 79.9194 },
  { name: 'Kandana', district: 'Gampaha', province: 'Western Province', lat: 7.0478, lng: 79.8978 },
  { name: 'Ja-Ela', district: 'Gampaha', province: 'Western Province', lat: 7.0756, lng: 79.8917 },
  { name: 'Seeduwa', district: 'Gampaha', province: 'Western Province', lat: 7.1264, lng: 79.8711 },
  { name: 'Katunayake', district: 'Gampaha', province: 'Western Province', lat: 7.1694, lng: 79.8886 },
  { name: 'Negombo', district: 'Gampaha', province: 'Western Province', lat: 7.2083, lng: 79.8358 },
  { name: 'Kochchikade', district: 'Gampaha', province: 'Western Province', lat: 7.2606, lng: 79.8667 },
  { name: 'Biyagama', district: 'Gampaha', province: 'Western Province', lat: 6.9406, lng: 79.9769 },
  { name: 'Delgoda', district: 'Gampaha', province: 'Western Province', lat: 6.9944, lng: 79.9917 },
  { name: 'Gampaha Town', district: 'Gampaha', province: 'Western Province', lat: 7.0917, lng: 79.9997 },
  { name: 'Yakkala', district: 'Gampaha', province: 'Western Province', lat: 7.0861, lng: 80.0333 },
  { name: 'Nittambuwa', district: 'Gampaha', province: 'Western Province', lat: 7.1439, lng: 80.0986 },
  { name: 'Minuwangoda', district: 'Gampaha', province: 'Western Province', lat: 7.1683, lng: 79.9539 },
  { name: 'Mirigama', district: 'Gampaha', province: 'Western Province', lat: 7.2433, lng: 80.1294 },

  // Kalutara District (Western Province)
  { name: 'Panadura', district: 'Kalutara', province: 'Western Province', lat: 6.7131, lng: 79.9075 },
  { name: 'Wadduwa', district: 'Kalutara', province: 'Western Province', lat: 6.6667, lng: 79.9333 },
  { name: 'Kalutara Town', district: 'Kalutara', province: 'Western Province', lat: 6.5854, lng: 79.9607 },
  { name: 'Beruwala', district: 'Kalutara', province: 'Western Province', lat: 6.4789, lng: 79.9828 },
  { name: 'Aluthgama', district: 'Kalutara', province: 'Western Province', lat: 6.4319, lng: 80.0031 },
  { name: 'Horana', district: 'Kalutara', province: 'Western Province', lat: 6.7147, lng: 80.0628 },
  { name: 'Bandaragama', district: 'Kalutara', province: 'Western Province', lat: 6.7167, lng: 79.9833 },
  { name: 'Matugama', district: 'Kalutara', province: 'Western Province', lat: 6.5222, lng: 80.1147 },
  { name: 'Ingiriya', district: 'Kalutara', province: 'Western Province', lat: 6.7417, lng: 80.1667 },

  // Outstation / Other Provinces
  { name: 'Kandy Town', district: 'Kandy', province: 'Central', lat: 7.2906, lng: 80.6337 },
  { name: 'Peradeniya', district: 'Kandy', province: 'Central', lat: 7.2600, lng: 80.5975 },
  { name: 'Matale', district: 'Matale', province: 'Central', lat: 7.4675, lng: 80.6234 },
  { name: 'Nuwara Eliya', district: 'Nuwara Eliya', province: 'Central', lat: 6.9497, lng: 80.7891 },
  { name: 'Galle Town', district: 'Galle', province: 'Southern', lat: 6.0535, lng: 80.2210 },
  { name: 'Hikkaduwa', district: 'Galle', province: 'Southern', lat: 6.1394, lng: 80.1006 },
  { name: 'Matara Town', district: 'Matara', province: 'Southern', lat: 5.9549, lng: 80.5550 },
  { name: 'Hambantota', district: 'Hambantota', province: 'Southern', lat: 6.1248, lng: 81.1185 },
  { name: 'Kurunegala Town', district: 'Kurunegala', province: 'North Western', lat: 7.4863, lng: 80.3623 },
  { name: 'Chilaw', district: 'Puttalam', province: 'North Western', lat: 7.5758, lng: 79.7953 },
  { name: 'Puttalam Town', district: 'Puttalam', province: 'North Western', lat: 8.0362, lng: 79.8283 },
  { name: 'Anuradhapura', district: 'Anuradhapura', province: 'North Central', lat: 8.3114, lng: 80.4037 },
  { name: 'Polonnaruwa', district: 'Polonnaruwa', province: 'North Central', lat: 7.9403, lng: 81.0188 },
  { name: 'Ratnapura', district: 'Ratnapura', province: 'Sabaragamuwa', lat: 6.6828, lng: 80.4018 },
  { name: 'Kegalle', district: 'Kegalle', province: 'Sabaragamuwa', lat: 7.2514, lng: 80.3464 },
  { name: 'Badulla', district: 'Badulla', province: 'Uva', lat: 6.9934, lng: 81.0550 },
  { name: 'Bandarawela', district: 'Badulla', province: 'Uva', lat: 6.8258, lng: 80.9981 },
  { name: 'Jaffna', district: 'Jaffna', province: 'Northern', lat: 9.6615, lng: 80.0255 },
  { name: 'Trincomalee', district: 'Trincomalee', province: 'Eastern', lat: 8.5874, lng: 81.2152 },
  { name: 'Batticaloa', district: 'Batticaloa', province: 'Eastern', lat: 7.7102, lng: 81.6924 },
]

export function findNearestLocation(lat, lng) {
  let nearest = SRI_LANKA_LOCATIONS[0]
  let minDistance = Infinity

  for (const loc of SRI_LANKA_LOCATIONS) {
    const dist = calculateDistanceKm(lat, lng, loc.lat, loc.lng)
    if (dist < minDistance) {
      minDistance = dist
      nearest = loc
    }
  }

  // Western Province bounding box check:
  const isWithinWesternBox = lat >= 6.35 && lat <= 7.35 && lng >= 79.80 && lng <= 80.25
  const isWestern =
    nearest.province === 'Western Province' ||
    (isWithinWesternBox && ['Colombo', 'Gampaha', 'Kalutara'].includes(nearest.district))

  return {
    nearestTown: nearest.name,
    district: nearest.district,
    province: isWestern ? 'Western Province' : nearest.province,
    isWestern,
    distanceFromNearestTown: minDistance,
  }
}

/* ─────────────────────────────────────────────
   CUSTOM VECTOR LEAFLET ICONS
───────────────────────────────────────────── */
const createPinIcon = (label = 'Your Location') =>
  L.divIcon({
    className: 'custom-user-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: grab;">
        <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); width: 34px; height: 34px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.45); display: flex; align-items: center; justify-content: center; color: white;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3" fill="#ffffff"/>
          </svg>
        </div>
        <div style="width: 8px; height: 8px; background: #0369a1; transform: rotate(45deg); margin-top: -4px;"></div>
      </div>
    `,
    iconSize: [34, 42],
    iconAnchor: [17, 40],
  })

const createHubIcon = () =>
  L.divIcon({
    className: 'custom-hub-pin',
    html: `
      <div style="position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer;">
        <div style="background: #0f172a; width: 30px; height: 30px; border-radius: 50%; border: 2.5px solid #38bdf8; box-shadow: 0 3px 10px rgba(15, 23, 42, 0.5); display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 14px; font-weight: 900;">
          ★
        </div>
        <div style="position: absolute; top: -19px; white-space: nowrap; background: #0f172a; color: #38bdf8; font-size: 9px; font-weight: 800; padding: 2px 6px; border-radius: 6px; border: 1px solid #38bdf8; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
          Kadawatha Hub
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })

/* ─────────────────────────────────────────────
   COMPONENT: MapLocationPicker
───────────────────────────────────────────── */
export default function MapLocationPicker({
  initialLocation = null,
  onLocationSelect,
  category = 'residential',
}) {
  const [currentLoc, setCurrentLoc] = useState(initialLocation)
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSearchingOnline, setIsSearchingOnline] = useState(false)
  const [isLocatingGPS, setIsLocatingGPS] = useState(false)
  const [gpsError, setGpsError] = useState(null)

  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const userMarkerRef = useRef(null)
  const circleRef = useRef(null)

  // Notify parent of location changes
  const applyLocation = (lat, lng, label = null, districtOverride = null) => {
    const distKm = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, lat, lng)
    const distCat = distKm <= 20.0 ? 'Within 20 KM' : 'Beyond 20 KM'
    const match = findNearestLocation(lat, lng)

    const finalDistrict = districtOverride || match.district
    const finalProvince = match.isWestern ? 'Western Province' : match.province
    const finalName = label || (match.distanceFromNearestTown < 1.5 ? match.nearestTown : `${match.nearestTown} area`)

    const locData = {
      name: finalName,
      address: finalName,
      lat,
      lng,
      district: finalDistrict,
      province: finalProvince,
      isWestern: match.isWestern,
      distanceKm: distKm,
      distanceCategory: distCat,
    }

    setCurrentLoc(locData)
    if (onLocationSelect) {
      onLocationSelect(locData)
    }

    // Create or move marker & pan map
    if (userMarkerRef.current) {
      userMarkerRef.current.setLatLng([lat, lng])
    } else if (mapInstanceRef.current) {
      const marker = L.marker([lat, lng], {
        icon: createPinIcon(),
        draggable: true,
      }).addTo(mapInstanceRef.current)

      marker.on('dragend', e => {
        const pos = e.target.getLatLng()
        applyLocation(pos.lat, pos.lng)
      })

      userMarkerRef.current = marker
    }

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo([lat, lng], { animate: true })
    }
  }

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return // already initialized

    const initialCenter = currentLoc
      ? [currentLoc.lat, currentLoc.lng]
      : [COLOMBO_HUB.lat, COLOMBO_HUB.lng]

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    })

    // Add minimal zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

    // 20 KM radius circle around Kadawatha Hub
    const circle = L.circle([COLOMBO_HUB.lat, COLOMBO_HUB.lng], {
      radius: 20000,
      color: '#0284c7',
      weight: 2,
      dashArray: '5, 5',
      fillColor: '#38bdf8',
      fillOpacity: 0.12,
    }).addTo(map)
    circleRef.current = circle

    // Kadawatha Service Hub Pin with popup
    L.marker([COLOMBO_HUB.lat, COLOMBO_HUB.lng], {
      icon: createHubIcon(),
    })
      .bindPopup(
        `<div style="font-family: sans-serif; font-size: 12px; line-height: 1.4; padding: 2px;">
          <div style="font-weight: 800; color: #0369a1;">★ Safeguard Service Hub</div>
          <div style="color: #334155; margin-top: 3px; font-size: 11px; font-weight: 600;">14/1/A, Kandy Road, Kadawatha</div>
          <div style="color: #64748b; font-size: 10px; margin-top: 2px;">Central Service Hub (20 km Radius origin)</div>
        </div>`
      )
      .addTo(map)

    // Customer Location Draggable Marker (if already provided)
    if (currentLoc) {
      const marker = L.marker([currentLoc.lat, currentLoc.lng], {
        icon: createPinIcon(),
        draggable: true,
      }).addTo(map)

      marker.on('dragend', e => {
        const pos = e.target.getLatLng()
        applyLocation(pos.lat, pos.lng)
      })

      userMarkerRef.current = marker
    }

    // Click map to place pin
    map.on('click', e => {
      applyLocation(e.latlng.lat, e.latlng.lng)
    })

    mapInstanceRef.current = map

    // Ensure map tiles resize correctly after mounting
    const timer = setTimeout(() => {
      map.invalidateSize()
    }, 200)

    return () => {
      clearTimeout(timer)
      map.remove()
      mapInstanceRef.current = null
      userMarkerRef.current = null
    }
  }, [])

  // Invalidate size if container becomes visible
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => mapInstanceRef.current?.invalidateSize(), 150)
    }
  }, [])

  // Instant local suggestions as user types
  const handleInputChange = e => {
    const val = e.target.value
    setSearchQuery(val)
    setGpsError(null)

    if (!val.trim()) {
      setSuggestions([])
      return
    }

    const q = val.toLowerCase().trim()
    const matches = SRI_LANKA_LOCATIONS.filter(
      loc =>
        loc.name.toLowerCase().includes(q) ||
        loc.district.toLowerCase().includes(q)
    ).slice(0, 5)

    setSuggestions(matches)
  }

  // User selects a suggestion from dropdown
  const handleSelectSuggestion = loc => {
    setSearchQuery(loc.name)
    setSuggestions([])
    applyLocation(loc.lat, loc.lng, loc.name, loc.district)
  }

  // Online Nominatim Search fallback when hitting enter
  const handleSearchSubmit = async e => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return

    // Check if matching suggestion exists first
    const q = searchQuery.toLowerCase().trim()
    const directMatch = SRI_LANKA_LOCATIONS.find(loc => loc.name.toLowerCase().includes(q))
    if (directMatch) {
      handleSelectSuggestion(directMatch)
      return
    }

    setIsSearchingOnline(true)
    setGpsError(null)
    setSuggestions([])

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery + ', Sri Lanka'
        )}&countrycodes=lk&limit=1`
      )
      const data = await res.json()
      if (data && data.length > 0) {
        const item = data[0]
        const lat = parseFloat(item.lat)
        const lng = parseFloat(item.lon)
        const displayName = item.display_name.split(',')[0] || searchQuery
        applyLocation(lat, lng, displayName)
      } else {
        setGpsError('Location not found. Click the map to drop your pin.')
      }
    } catch {
      setGpsError('Could not reach search service. Please click on the map.')
    } finally {
      setIsSearchingOnline(false)
    }
  }

  // Browser Geolocation API ("Use My Location")
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser')
      return
    }

    setIsLocatingGPS(true)
    setGpsError(null)

    navigator.geolocation.getCurrentPosition(
      pos => {
        setIsLocatingGPS(false)
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        applyLocation(lat, lng, 'My Current Location')
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 13, { animate: true })
        }
      },
      err => {
        setIsLocatingGPS(false)
        if (err.code === 1) {
          setGpsError('Location permission denied. Please search or click on the map.')
        } else {
          setGpsError('Unable to detect location. Please search or click on the map.')
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  return (
    <div className="space-y-3">
      {/* ── SEARCH & GPS CONTROLS ── */}
      <div className="relative">
        <form onSubmit={handleSearchSubmit} className="flex gap-1.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search town, suburb or address..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-slate-50 placeholder-slate-400"
            />
            {isSearchingOnline && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-600 animate-spin" />
            )}
          </div>

          <button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLocatingGPS}
            title="Use current GPS location"
            className="px-3 py-2.5 rounded-xl border border-sky-200 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shrink-0 disabled:opacity-50"
          >
            {isLocatingGPS ? (
              <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
            ) : (
              <Navigation className="w-4 h-4 text-sky-600" />
            )}
            <span className="hidden sm:inline">Use GPS</span>
          </button>
        </form>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden divide-y divide-slate-100">
            {suggestions.map(s => {
              const d = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, s.lat, s.lng)
              return (
                <button
                  key={`${s.name}-${s.lat}`}
                  type="button"
                  onClick={() => handleSelectSuggestion(s)}
                  className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-sky-50 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800">{s.name}</span>
                      <span className="text-[11px] text-slate-400 ml-1.5">({s.district})</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-extrabold text-sky-700 shrink-0">
                    {d} km · {d <= 20 ? 'Within 20 km' : 'Beyond 20 km'}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {gpsError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* ── INTERACTIVE LEAFLET MAP ── */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
        <div
          ref={mapContainerRef}
          className="w-full h-44 sm:h-48 bg-slate-100 z-0"
          style={{ minHeight: '175px' }}
        />

        {/* Map Legend Overlay */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none flex flex-wrap gap-1">
          <div className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full border border-sky-500 bg-sky-200" />
            <span>20 km Radius Zone</span>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs border border-slate-200 text-[10px] font-bold text-slate-700 shadow-2xs flex items-center gap-1">
            <span className="text-sky-600 font-black">★</span>
            <span>Kadawatha Hub</span>
          </div>
        </div>

        {/* Hint banner */}
        <div className="absolute bottom-1.5 left-2 right-2 z-10 pointer-events-none text-center">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900/75 text-white text-[10px] font-semibold backdrop-blur-xs shadow-xs">
            {currentLoc
              ? '💡 Drag pin or click map to adjust your exact location'
              : '📍 Search your town above or click on the map to pin your location'}
          </span>
        </div>
      </div>

      {/* ── LIVE LOCATION & DISTANCE STATUS CARD ── */}
      {!currentLoc ? (
        <div className="rounded-2xl border-2 border-dashed border-sky-300 bg-sky-50/70 p-4 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-900">
            <MapPin className="w-4 h-4 text-sky-600 animate-pulse" />
            <span>Please Select Your Location</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Search your town or suburb above, tap on the map, or click <span className="font-bold text-sky-700">"Use GPS"</span> to detect your service distance.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-sky-400/50 bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{currentLoc.name}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-5">
                District: <span className="font-bold text-slate-700">{currentLoc.district}</span>
                {' · '}
                <span>{currentLoc.province}</span>
              </p>
            </div>

            {/* Distance Badge */}
            <div className="text-right shrink-0">
              <div className="text-lg sm:text-xl font-black text-sky-800 leading-none">
                {currentLoc.distanceKm} <span className="text-xs font-bold text-slate-600">km</span>
              </div>
              <span
                className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  currentLoc.distanceCategory === 'Within 20 KM'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-sky-100 text-sky-800 border border-sky-300'
                }`}
              >
                {currentLoc.distanceCategory === 'Within 20 KM' ? 'Within 20 km' : 'Beyond 20 km'}
              </span>
            </div>
          </div>

          {/* Service Eligibility Note */}
          <div className="pt-2 border-t border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
            {currentLoc.isWestern ? (
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                Western Province: All service packages available
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-700 font-semibold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                Outstation: Deep Cleaning available via Site Inspection
              </span>
            )}
            <span className="text-[10px] text-slate-400 font-medium sm:text-right">
              Hub: 14/1/A, Kandy Rd, Kadawatha
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

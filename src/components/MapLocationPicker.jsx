import { useState, useEffect, useRef, useCallback } from 'react'
import {
  MapPin,
  Search,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react'
import { loadGoogleMaps } from '../utils/googleMapsLoader'

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

const WESTERN_DISTRICTS = ['Colombo', 'Gampaha', 'Kalutara']

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
   SRI LANKA TOWNS DATABASE (FAST LOCAL CACHE)
───────────────────────────────────────────── */
export const SRI_LANKA_LOCATIONS = [
  // Colombo District
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
  { name: 'Moratuwa', district: 'Colombo', province: 'Western Province', lat: 6.773, lng: 79.8816 },
  { name: 'Battaramulla', district: 'Colombo', province: 'Western Province', lat: 6.8986, lng: 79.9192 },
  { name: 'Pelawatta', district: 'Colombo', province: 'Western Province', lat: 6.8911, lng: 79.9317 },
  { name: 'Sri Jayawardenepura Kotte', district: 'Colombo', province: 'Western Province', lat: 6.8906, lng: 79.9011 },
  { name: 'Maharagama', district: 'Colombo', province: 'Western Province', lat: 6.848, lng: 79.9265 },
  { name: 'Pannipitiya', district: 'Colombo', province: 'Western Province', lat: 6.8456, lng: 79.9547 },
  { name: 'Kottawa', district: 'Colombo', province: 'Western Province', lat: 6.8419, lng: 79.9658 },
  { name: 'Homagama', district: 'Colombo', province: 'Western Province', lat: 6.8433, lng: 80.0031 },
  { name: 'Malabe', district: 'Colombo', province: 'Western Province', lat: 6.9042, lng: 79.9547 },
  { name: 'Kaduwela', district: 'Colombo', province: 'Western Province', lat: 6.9347, lng: 79.9839 },
  { name: 'Athurugiriya', district: 'Colombo', province: 'Western Province', lat: 6.8719, lng: 79.9886 },
  { name: 'Piliyandala', district: 'Colombo', province: 'Western Province', lat: 6.8017, lng: 79.9228 },
  { name: 'Kesbewa', district: 'Colombo', province: 'Western Province', lat: 6.7869, lng: 79.9489 },
  { name: 'Kolonnawa', district: 'Colombo', province: 'Western Province', lat: 6.9372, lng: 79.8931 },

  // Gampaha District
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
  { name: 'Biyagama', district: 'Gampaha', province: 'Western Province', lat: 6.9406, lng: 79.9769 },
  { name: 'Delgoda', district: 'Gampaha', province: 'Western Province', lat: 6.9944, lng: 79.9917 },
  { name: 'Gampaha Town', district: 'Gampaha', province: 'Western Province', lat: 7.0917, lng: 79.9997 },
  { name: 'Yakkala', district: 'Gampaha', province: 'Western Province', lat: 7.0861, lng: 80.0333 },
  { name: 'Nittambuwa', district: 'Gampaha', province: 'Western Province', lat: 7.1439, lng: 80.0986 },

  // Kalutara District
  { name: 'Panadura', district: 'Kalutara', province: 'Western Province', lat: 6.7131, lng: 79.9075 },
  { name: 'Wadduwa', district: 'Kalutara', province: 'Western Province', lat: 6.6667, lng: 79.9333 },
  { name: 'Kalutara Town', district: 'Kalutara', province: 'Western Province', lat: 6.5854, lng: 79.9607 },
  { name: 'Beruwala', district: 'Kalutara', province: 'Western Province', lat: 6.4789, lng: 79.9828 },
  { name: 'Horana', district: 'Kalutara', province: 'Western Province', lat: 6.7147, lng: 80.0628 },
  { name: 'Bandaragama', district: 'Kalutara', province: 'Western Province', lat: 6.7167, lng: 79.9833 },

  // Outstation Major Cities & Towns
  { name: 'Kandy Town', district: 'Kandy', province: 'Central', lat: 7.2906, lng: 80.6337 },
  { name: 'Kundasale', district: 'Kandy', province: 'Central', lat: 7.2805, lng: 80.6845 },
  { name: 'Peradeniya', district: 'Kandy', province: 'Central', lat: 7.26, lng: 80.5975 },
  { name: 'Katugastota', district: 'Kandy', province: 'Central', lat: 7.3278, lng: 80.6214 },
  { name: 'Galle Town', district: 'Galle', province: 'Southern', lat: 6.0535, lng: 80.221 },
  { name: 'Matara Town', district: 'Matara', province: 'Southern', lat: 5.9549, lng: 80.555 },
  { name: 'Kurunegala Town', district: 'Kurunegala', province: 'North Western', lat: 7.4863, lng: 80.3623 },
  { name: 'Ratnapura', district: 'Ratnapura', province: 'Sabaragamuwa', lat: 6.6828, lng: 80.4018 },
  { name: 'Anuradhapura', district: 'Anuradhapura', province: 'North Central', lat: 8.3114, lng: 80.4037 },
  { name: 'Jaffna', district: 'Jaffna', province: 'Northern', lat: 9.6615, lng: 80.0255 },
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

  const isWithinWesternBox = lat >= 6.35 && lat <= 7.35 && lng >= 79.8 && lng <= 80.25
  const isWestern =
    nearest.province === 'Western Province' ||
    (isWithinWesternBox && WESTERN_DISTRICTS.includes(nearest.district))

  return {
    nearestTown: nearest.name,
    district: nearest.district,
    province: isWestern ? 'Western Province' : nearest.province,
    isWestern,
    distanceFromNearestTown: minDistance,
  }
}

/* ─────────────────────────────────────────────
   AUTOCOMPLETE ENGINE (ONLINE + LOCAL)
───────────────────────────────────────────── */
async function searchSriLankaAddresses(query) {
  if (!query || query.trim().length < 2) return []

  const q = query.trim().toLowerCase()

  // 1. Instant local matches
  const localMatches = SRI_LANKA_LOCATIONS.filter(
    loc => loc.name.toLowerCase().includes(q) || loc.district.toLowerCase().includes(q)
  ).map(loc => ({
    name: loc.name,
    secondary: `${loc.district}, ${loc.province}`,
    lat: loc.lat,
    lng: loc.lng,
    district: loc.district,
    province: loc.province,
    isWestern: loc.province === 'Western Province' || WESTERN_DISTRICTS.includes(loc.district),
  }))

  // 2. Online search for any street, suburb, or landmark in Sri Lanka
  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&lat=6.9271&lon=79.8612&limit=8`
    )
    if (!res.ok) return localMatches.slice(0, 5)

    const data = await res.json()
    const features = data.features || []

    const onlineMatches = features
      .filter(f => {
        const props = f.properties || {}
        return (
          props.countrycode === 'LK' ||
          (props.country && (props.country.includes('ශ්‍රී ලංකාව') || props.country.includes('Sri Lanka')))
        )
      })
      .map(f => {
        const p = f.properties
        const [lng, lat] = f.geometry.coordinates

        const primary = p.name || p.street || p.city || query
        const secondaryParts = [p.street, p.city || p.district, p.county, p.state].filter(
          item => item && item !== primary
        )
        const secondary = secondaryParts.join(', ')

        const districtStr = (p.county || p.city || '').replace(' District', '')
        const fallback = findNearestLocation(lat, lng)
        const finalDistrict = districtStr || fallback.district
        const finalProvince = (p.state || fallback.province).replace(' Province', '') + ' Province'
        const isWestern =
          finalProvince.includes('Western') ||
          WESTERN_DISTRICTS.includes(finalDistrict) ||
          fallback.isWestern

        return {
          name: primary,
          secondary: secondary || `${finalDistrict}, ${finalProvince}`,
          lat,
          lng,
          district: finalDistrict,
          province: isWestern ? 'Western Province' : finalProvince,
          isWestern,
        }
      })

    // Combine and deduplicate
    const combined = [...onlineMatches]
    for (const lm of localMatches) {
      if (!combined.some(c => calculateDistanceKm(c.lat, c.lng, lm.lat, lm.lng) < 2)) {
        combined.push(lm)
      }
    }

    return combined.slice(0, 6)
  } catch {
    return localMatches.slice(0, 5)
  }
}

/* ─────────────────────────────────────────────
   COMPONENT: MapLocationPicker
───────────────────────────────────────────── */
export default function MapLocationPicker({
  initialLocation = null,
  onLocationSelect,
  category = 'residential',
}) {
  const [currentLoc, setCurrentLoc] = useState(initialLocation)
  const [searchQuery, setSearchQuery] = useState(initialLocation?.address || initialLocation?.name || '')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isMapLoading, setIsMapLoading] = useState(true)
  const [loadError, setLoadError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isLocatingGPS, setIsLocatingGPS] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)

  const isUserTypingRef = useRef(false)
  const mapContainerRef = useRef(null)
  const searchContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const hubMarkerRef = useRef(null)
  const circleRef = useRef(null)
  const geocoderRef = useRef(null)

  // Parse Google Geocoder address components
  const parseAddressComponents = (addressComponents, lat, lng, formattedAddress) => {
    let district = null
    let province = null
    let locality = null
    let sublocality = null
    let route = null

    if (Array.isArray(addressComponents)) {
      for (const comp of addressComponents) {
        const types = comp.types || []
        if (types.includes('administrative_area_level_2')) {
          district = comp.long_name.replace(' District', '')
        }
        if (types.includes('administrative_area_level_1')) {
          province = comp.long_name
        }
        if (types.includes('locality')) {
          locality = comp.long_name
        }
        if (types.includes('sublocality') || types.includes('sublocality_level_1')) {
          sublocality = comp.long_name
        }
        if (types.includes('route')) {
          route = comp.long_name
        }
      }
    }

    const fallback = findNearestLocation(lat, lng)
    const finalDistrict = district || fallback.district
    const finalProvince = province || fallback.province

    const isWestern =
      finalProvince.toLowerCase().includes('western') ||
      WESTERN_DISTRICTS.includes(finalDistrict) ||
      fallback.isWestern

    const primaryName = sublocality || locality || route || fallback.nearestTown
    const cleanAddress = formattedAddress
      ? formattedAddress.replace(', Sri Lanka', '').trim()
      : `${primaryName}, ${finalDistrict}`

    return {
      district: finalDistrict,
      province: isWestern ? 'Western Province' : finalProvince,
      isWestern,
      name: primaryName,
      address: cleanAddress,
    }
  }

  // Update location and notify parent
  const handleLocationUpdate = useCallback(
    (lat, lng, addressInfo = {}) => {
      const distKm = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, lat, lng)
      const distCat = distKm <= 20.0 ? 'Within 20 KM' : 'Beyond 20 KM'

      const locData = {
        name: addressInfo.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        address: addressInfo.address || addressInfo.name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        lat,
        lng,
        district: addressInfo.district || 'Colombo',
        province: addressInfo.province || 'Western Province',
        isWestern: Boolean(addressInfo.isWestern),
        distanceKm: distKm,
        distanceCategory: distCat,
      }

      setCurrentLoc(locData)
      isUserTypingRef.current = false
      setShowSuggestions(false)
      setSuggestions([])
      if (addressInfo.name || addressInfo.address) {
        setSearchQuery(addressInfo.name || addressInfo.address)
      }

      if (onLocationSelect) {
        onLocationSelect(locData)
      }

      if (markerRef.current && (window.google?.maps || mapInstanceRef.current)) {
        markerRef.current.setPosition({ lat, lng })
        markerRef.current.setVisible(true)
      }
    },
    [onLocationSelect]
  )

  // Reverse geocode coordinates to an address
  const reverseGeocode = useCallback(
    (lat, lng) => {
      if (!geocoderRef.current) return
      setIsSearching(true)
      setStatusMessage(null)

      geocoderRef.current.geocode({ location: { lat, lng } }, (results, status) => {
        setIsSearching(false)
        if (status === 'OK' && results && results[0]) {
          const res = results[0]
          const parsed = parseAddressComponents(res.address_components, lat, lng, res.formatted_address)
          handleLocationUpdate(lat, lng, parsed)
        } else {
          const fallback = findNearestLocation(lat, lng)
          handleLocationUpdate(lat, lng, {
            name: fallback.nearestTown,
            address: `${fallback.nearestTown}, ${fallback.district}`,
            district: fallback.district,
            province: fallback.province,
            isWestern: fallback.isWestern,
          })
        }
      })
    },
    [handleLocationUpdate]
  )

  // Initialize Google Maps
  useEffect(() => {
    let isMounted = true
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setLoadError('Google Maps API key is missing. Please configure VITE_GOOGLE_MAPS_API_KEY in your .env file.')
      setIsMapLoading(false)
      return
    }

    loadGoogleMaps(apiKey)
      .then(googleObj => {
        if (!isMounted || !mapContainerRef.current) return

        const maps = window.google?.maps || googleObj?.maps || googleObj
        if (!maps || !maps.Geocoder || !maps.Map) {
          throw new Error('Google Maps components could not be loaded.')
        }

        setIsMapLoading(false)
        geocoderRef.current = new maps.Geocoder()

        const centerLat = currentLoc ? currentLoc.lat : COLOMBO_HUB.lat
        const centerLng = currentLoc ? currentLoc.lng : COLOMBO_HUB.lng

        const map = new maps.Map(mapContainerRef.current, {
          center: { lat: centerLat, lng: centerLng },
          zoom: currentLoc ? 12 : 11,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })
        mapInstanceRef.current = map

        // 20 KM Service Radius Circle
        const circle = new maps.Circle({
          strokeColor: '#0284c7',
          strokeOpacity: 0.85,
          strokeWeight: 2,
          fillColor: '#38bdf8',
          fillOpacity: 0.12,
          map,
          center: { lat: COLOMBO_HUB.lat, lng: COLOMBO_HUB.lng },
          radius: 20000,
        })
        circleRef.current = circle

        // Custom Hub Icon
        const hubIcon = {
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
                <circle cx="17" cy="17" r="15" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
                <path d="M17 7.5l2.7 5.7 6.3.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.5-4.4 6.3-.9z" fill="#38bdf8"/>
              </svg>
            `),
          scaledSize: new maps.Size(34, 34),
          anchor: new maps.Point(17, 17),
        }

        // Custom User Pin Icon
        const userPinIcon = {
          url:
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="38" height="48" viewBox="0 0 38 48">
                <defs>
                  <filter id="dropshadow" x="-20%" y="-10%" width="140%" height="130%">
                    <feDropShadow dx="0" dy="4" stdDeviation="3" flood-color="#0284c7" flood-opacity="0.45"/>
                  </filter>
                </defs>
                <path d="M19 2C10.7 2 4 8.7 4 17c0 12 15 28 15 28s15-16 15-28c0-8.3-6.7-15-15-15z" fill="#0284c7" stroke="#ffffff" stroke-width="2.5" filter="url(#dropshadow)"/>
                <circle cx="19" cy="17" r="6" fill="#ffffff"/>
              </svg>
            `),
          scaledSize: new maps.Size(38, 48),
          anchor: new maps.Point(19, 46),
        }

        // Hub Marker
        const hubMarker = new maps.Marker({
          position: { lat: COLOMBO_HUB.lat, lng: COLOMBO_HUB.lng },
          map,
          title: 'Safeguard Service Hub (Kadawatha)',
          icon: hubIcon,
          zIndex: 1,
        })
        hubMarkerRef.current = hubMarker

        const hubInfoWindow = new maps.InfoWindow({
          content: `
            <div style="font-family: inherit; font-size: 12px; line-height: 1.4; padding: 2px 4px;">
              <div style="font-weight: 800; color: #0369a1;">★ Safeguard Service Hub</div>
              <div style="color: #334155; margin-top: 3px; font-weight: 600;">14/1/A, Kandy Road, Kadawatha</div>
              <div style="color: #64748b; font-size: 10px; margin-top: 2px;">20 KM Radius origin point</div>
            </div>
          `,
        })

        hubMarker.addListener('click', () => {
          hubInfoWindow.open(map, hubMarker)
        })

        // User Draggable Marker
        const marker = new maps.Marker({
          position: { lat: centerLat, lng: centerLng },
          map,
          draggable: true,
          title: 'Your Location (Drag to adjust)',
          icon: userPinIcon,
          zIndex: 2,
          visible: Boolean(currentLoc),
        })
        markerRef.current = marker

        marker.addListener('dragend', e => {
          reverseGeocode(e.latLng.lat(), e.latLng.lng())
        })

        map.addListener('click', e => {
          reverseGeocode(e.latLng.lat(), e.latLng.lng())
        })

        // MutationObserver: Auto-dismiss and suppress Google error dialogs
        const dismissObserver = new MutationObserver(() => {
          const errModal = mapContainerRef.current?.querySelector('.gm-err-container')
          if (errModal) {
            errModal.remove()
          }
          const btn = mapContainerRef.current?.querySelector('.dismissButton')
          if (btn) {
            btn.click()
          }
        })
        dismissObserver.observe(mapContainerRef.current, { childList: true, subtree: true })
      })
      .catch(err => {
        if (!isMounted) return
        setLoadError(err.message || 'Could not load map.')
        setIsMapLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [handleLocationUpdate, reverseGeocode])

  // Real-time suggestions debouncer (runs only when user is actively typing)
  useEffect(() => {
    if (!isUserTypingRef.current || !showSuggestions || !searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      const results = await searchSriLankaAddresses(searchQuery)
      if (isUserTypingRef.current && showSuggestions) {
        setSuggestions(results)
      }
      setIsSearching(false)
    }, 220)

    return () => clearTimeout(timer)
  }, [searchQuery, showSuggestions])

  // Click outside listener to dismiss suggestions dropdown
  useEffect(() => {
    const handleClickOutside = e => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false)
        setSuggestions([])
        isUserTypingRef.current = false
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // User selects an address suggestion from dropdown
  const handleSelectSuggestion = item => {
    isUserTypingRef.current = false
    setShowSuggestions(false)
    setSuggestions([])
    setSearchQuery(item.name)
    setStatusMessage(null)

    if (mapInstanceRef.current) {
      mapInstanceRef.current.panTo({ lat: item.lat, lng: item.lng })
      mapInstanceRef.current.setZoom(15)
    }

    handleLocationUpdate(item.lat, item.lng, {
      name: item.name,
      address: item.secondary ? `${item.name}, ${item.secondary}` : item.name,
      district: item.district,
      province: item.province,
      isWestern: item.isWestern,
    })
  }

  // Manual Geocode Search (Search Button / Enter Key)
  const handleSearchSubmit = e => {
    if (e) e.preventDefault()
    isUserTypingRef.current = false
    setShowSuggestions(false)
    setSuggestions([])
    if (!searchQuery.trim()) return

    // If suggestions are open, select the first suggestion
    if (suggestions.length > 0) {
      handleSelectSuggestion(suggestions[0])
      return
    }

    setIsSearching(true)
    setStatusMessage(null)

    if (geocoderRef.current) {
      geocoderRef.current.geocode(
        {
          address: searchQuery,
          componentRestrictions: { country: 'lk' },
        },
        (results, status) => {
          setIsSearching(false)
          if (status === 'OK' && results && results[0]) {
            const res = results[0]
            const lat = res.geometry.location.lat()
            const lng = res.geometry.location.lng()

            if (mapInstanceRef.current) {
              mapInstanceRef.current.panTo({ lat, lng })
              mapInstanceRef.current.setZoom(15)
            }

            const parsed = parseAddressComponents(res.address_components, lat, lng, res.formatted_address)
            handleLocationUpdate(lat, lng, parsed)
          } else {
            // Fallback online search
            searchSriLankaAddresses(searchQuery).then(resList => {
              if (resList.length > 0) {
                handleSelectSuggestion(resList[0])
              } else {
                setStatusMessage('Address not found. Please select from the dropdown or click on the map.')
              }
            })
          }
        }
      )
    } else {
      searchSriLankaAddresses(searchQuery).then(resList => {
        setIsSearching(false)
        if (resList.length > 0) {
          handleSelectSuggestion(resList[0])
        } else {
          setStatusMessage('Address not found. Please click on the map to pin.')
        }
      })
    }
  }

  // Browser Geolocation ("Use GPS")
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setStatusMessage('Geolocation is not supported by your browser')
      return
    }

    setIsLocatingGPS(true)
    setStatusMessage(null)

    navigator.geolocation.getCurrentPosition(
      pos => {
        setIsLocatingGPS(false)
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo({ lat, lng })
          mapInstanceRef.current.setZoom(15)
        }

        reverseGeocode(lat, lng)
      },
      err => {
        setIsLocatingGPS(false)
        if (err.code === 1) {
          setStatusMessage('Location permission denied. Please search your address above or click on the map.')
        } else {
          setStatusMessage('Unable to detect GPS position. Please type your address or click on the map.')
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  return (
    <div className="space-y-3">
      {/* ── SEARCH & AUTOCOMPLETE BAR ── */}
      <div ref={searchContainerRef} className="relative">
        <form onSubmit={handleSearchSubmit} className="flex gap-1.5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                isUserTypingRef.current = true
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
                setStatusMessage(null)
              }}
              onKeyDown={e => {
                if (e.key === 'Escape') {
                  setShowSuggestions(false)
                  setSuggestions([])
                  isUserTypingRef.current = false
                }
              }}
              placeholder="Search exact street address, town, or landmark..."
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 bg-white placeholder-slate-400 shadow-xs"
            />
            {isSearching && (
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

        {/* ── LIVE ADDRESS SUGGESTIONS DROPDOWN ── */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden divide-y divide-slate-100 max-h-64 overflow-y-auto">
            {suggestions.map((item, idx) => {
              const d = calculateDistanceKm(COLOMBO_HUB.lat, COLOMBO_HUB.lng, item.lat, item.lng)
              return (
                <button
                  key={`${item.name}-${item.lat}-${idx}`}
                  type="button"
                  onClick={() => handleSelectSuggestion(item)}
                  className="w-full px-3.5 py-2.5 text-left text-xs hover:bg-sky-50/80 flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <div className="font-extrabold text-slate-900 truncate">{item.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{item.secondary}</div>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                      d <= 20
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-sky-100 text-sky-800'
                    }`}
                  >
                    {d} km · {d <= 20 ? 'Within 20 km' : 'Beyond 20 km'}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {statusMessage && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* ── GOOGLE MAP CONTAINER ── */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
        <div
          ref={mapContainerRef}
          className="w-full h-48 sm:h-52 z-0"
          style={{ minHeight: '190px' }}
        />

        {/* Loading Overlay */}
        {isMapLoading && (
          <div className="absolute inset-0 bg-slate-100/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-20">
            <Loader2 className="w-7 h-7 text-sky-600 animate-spin" />
            <span className="text-xs font-bold text-slate-600">Loading Map...</span>
          </div>
        )}

        {/* Error Overlay */}
        {loadError && (
          <div className="absolute inset-0 bg-red-50/95 backdrop-blur-xs p-4 flex flex-col items-center justify-center text-center gap-2 z-20">
            <AlertCircle className="w-7 h-7 text-red-500" />
            <p className="text-xs font-bold text-red-800 max-w-sm">{loadError}</p>
          </div>
        )}

        {/* Map Legend Overlay */}
        <div className="absolute top-2 left-2 z-10 pointer-events-none flex flex-wrap gap-1">
          <div className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200 text-[10px] font-bold text-slate-700 shadow-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full border border-sky-500 bg-sky-200" />
            <span>20 km Radius Zone</span>
          </div>
          <div className="px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs border border-slate-200 text-[10px] font-bold text-slate-700 shadow-xs flex items-center gap-1">
            <span className="text-sky-600 font-black">★</span>
            <span>Kadawatha Hub</span>
          </div>
        </div>

        {/* Hint banner */}
        <div className="absolute bottom-1.5 left-2 right-2 z-10 pointer-events-none text-center">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-semibold backdrop-blur-xs shadow-xs">
            {currentLoc
              ? '💡 Drag pin or tap anywhere on the map to adjust exact spot'
              : '📍 Search address above, use GPS, or tap map to drop your pin'}
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
            Search your street address, town, or tap the map to calculate service distance &amp; rates.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-sky-400/50 bg-gradient-to-br from-sky-50 via-white to-emerald-50/50 p-3.5 shadow-sm space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="truncate">{currentLoc.address || currentLoc.name}</span>
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

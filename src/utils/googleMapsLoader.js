let googleMapsPromise = null

export function loadGoogleMaps(apiKey) {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'))

  if (window.google && window.google.maps && window.google.maps.Geocoder && window.google.maps.places) {
    return Promise.resolve(window.google)
  }

  if (googleMapsPromise) {
    return googleMapsPromise
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    const existing = document.querySelector('script[data-google-maps-script]')
    if (existing) {
      if (window.google && window.google.maps && window.google.maps.Geocoder) {
        resolve(window.google)
        return
      }
      existing.addEventListener('load', () => resolve(window.google))
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Maps')))
      return
    }

    // Unique callback for Google Maps initialization
    const callbackName = '__googleMapsInitCallback__' + Math.random().toString(36).substring(2, 9)

    window[callbackName] = () => {
      delete window[callbackName]
      if (window.google && window.google.maps) {
        resolve(window.google)
      } else {
        reject(new Error('Google Maps initialized but window.google.maps is undefined'))
      }
    }

    const script = document.createElement('script')
    script.setAttribute('data-google-maps-script', 'true')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=${callbackName}`
    script.async = true
    script.defer = true

    script.onerror = () => {
      delete window[callbackName]
      googleMapsPromise = null
      reject(new Error('Failed to load Google Maps script. Please check your network connection or API key.'))
    }

    window.gm_authFailure = () => {
      console.error('Google Maps API authentication failed! Check billing, API enablement and API restrictions.')
    }

    document.head.appendChild(script)
  })

  return googleMapsPromise
}

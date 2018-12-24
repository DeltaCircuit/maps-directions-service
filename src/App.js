import React, { Component } from 'react'
import './App.css'

var vytilaPosition = { lat: 9.9783655, lng: 76.3057156 }
var edappillyPosition = { lat: 10.0238302, lng: 76.3085373 }

const fortKochiPosition = { lat: 9.9628007, lng: 76.2384351 }

class App extends Component {
  map = null
  edappillyMarker = null
  fortKochiMarker = null
  directionsService = null
  directionsDisplay = null
  componentDidMount = () => {
    this.loadMapsScript().then(() => {
      const { google } = window //10.0238302,76.3085373
      this.directionsService = new google.maps.DirectionsService()
      this.directionsDisplay = new google.maps.DirectionsRenderer()

      this.map = new google.maps.Map(document.getElementById('maps'), {
        zoom: 12,
        center: vytilaPosition
      })
      this.directionsDisplay.setMap(this.map)
    })
  }

  loadMapsScript = () => {
    return new Promise((resolve, reject) => {
      let scriptTag = document.createElement('script')
      scriptTag.src =
        'https://maps.googleapis.com/maps/api/js?key=%API_KEY_HERE%'
      scriptTag.async = 1
      document.body.appendChild(scriptTag)
      scriptTag.onload = () => {
        resolve()
      }
      scriptTag.onerror = () => {
        reject()
      }
    })
  }

  render() {
    return (
      <div style={{ height: '100vh' }}>
        <button
          onClick={() => {
            if (!this.edappillyMarker && !this.fortKochiMarker) {
              const { google } = window
              // Plot Edappilly
              this.edappillyMarker = new google.maps.Marker({
                position: edappillyPosition,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 4
                },
                map: this.map
              })
              // Plot Fort Kochi
              this.fortKochiMarker = new google.maps.Marker({
                position: fortKochiPosition,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 4
                },
                map: this.map
              })
            }
          }}
        >
          Plot Edappilly and Fort Kochi Marker
        </button>
        <button
          onClick={() => {
            if (this.edappillyMarker && this.fortKochiMarker) {
              this.edappillyMarker.setMap(null)
              this.fortKochiMarker.setMap(null)
              this.fortKochiMarker = null
              this.edappillyMarker = null
            }
          }}
        >
          Remove Edappilly and Fort Kochi Marker
        </button>
        <button
          onClick={() => {
            var start = edappillyPosition
            var end = fortKochiPosition
            var request = {
              origin: start,
              destination: end,
              travelMode: 'DRIVING'
            }
            this.directionsService.route(request, (result, status) => {
              if (status === 'OK') {
                this.directionsDisplay.setDirections(result)
              }
            })
          }}
        >
          Draw Directions
        </button>
        <button
          onClick={() => {
            this.directionsDisplay.setMap(null)
          }}
        >
          Remove Directions
        </button>
        <div id="maps" />
      </div>
    )
  }
}

export default App

import { Component} from 'react'
import {  Map, GoogleApiWrapper } from "google-maps-react";

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={20}
        style={{ maxWidth:'100%', height: "500px" }}
        initialCenter = {
            {
                lat:26.2540493,
                lng:29.2675469
            }
        }
      >
        {/* <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDlUQaCQU2grWxd2xNBx0xCnS_QCD3fuWI",
})(MapContainer);

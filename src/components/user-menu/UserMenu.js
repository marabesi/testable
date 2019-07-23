import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Profile from '../profile/Profile';
import Cup from '../icons/Cup';
import { auth } from '../../pages/login/Auth';

export default class UserMenu extends Component {

  render() {
    return (
      <div className="flex justify-end items-center">
        <Cup className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          onClick={this.props.onNotification}
          className="fill-current w-8 h-8 text-white mr-5 hover:text-blue-lightest cursor-pointer"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="M509.622,464.823L402.004,289.912c-2.943-4.782-8.052-7.637-13.667-7.637c-5.614,0-10.723,2.856-13.664,7.637
              l-13.972,22.709c-2.174,3.533-1.072,8.16,2.461,10.334c3.535,2.173,8.16,1.072,10.335-2.461l13.972-22.71
              c0.074-0.12,0.299-0.486,0.87-0.486c0.571,0,0.797,0.366,0.871,0.486l107.618,174.911c0.086,0.139,0.314,0.51,0.022,1.033
              c-0.292,0.523-0.728,0.523-0.892,0.523h-59.6L269.665,203.333c-1.497-2.434-3.557-4.365-5.958-5.678
              c0.003,0.001,0.006,0.003,0.008,0.004v-50.98c6.251,1.695,12.34,2.419,18.297,2.419c17.132,0,33.175-5.955,48.87-11.781
              c21.748-8.073,42.29-15.698,64.508-6.788c2.865,1.149,6.103,0.803,8.66-0.927c2.561-1.732,4.089-4.611,4.089-7.701V37.044
              c0-3.74-2.219-7.101-5.65-8.561c-28.203-12.027-52.927-2.851-76.836,6.023c-22.398,8.314-43.553,16.167-66.588,5.872
              c-2.325-1.039-5.016-0.829-7.152,0.555c-2.136,1.385-3.425,3.757-3.425,6.303v0.279c-0.129,0.559-0.203,1.138-0.203,1.736v148.408
              c-2.397,1.313-4.455,3.243-5.951,5.674l-79.139,128.623l-25.868-42.043c-2.942-4.782-8.051-7.637-13.666-7.637
              c-5.614,0-10.723,2.855-13.665,7.637L2.377,464.823c-3.043,4.945-3.173,11.166-0.341,16.235c2.832,5.069,8.199,8.218,14.006,8.218
              h479.915c5.807,0,11.174-3.149,14.006-8.218C512.796,475.989,512.665,469.767,509.622,464.823z M263.512,57.901
              c24.317,6.67,46.158-1.437,67.37-9.311c20.985-7.79,40.867-15.168,62.234-7.642v72.985c-24.39-6.688-46.253,1.428-67.462,9.3
              c-20.95,7.776-40.813,15.149-62.142,7.646V57.901z M93.282,474.252l25.771-41.885c2.174-3.533,1.072-8.16-2.461-10.334
              c-3.534-2.173-8.16-1.072-10.334,2.461l-30.615,49.758h-59.6c-0.164,0-0.6,0-0.892-0.523s-0.065-0.893,0.022-1.033l107.619-174.91
              c0.074-0.12,0.299-0.486,0.87-0.486c0.571,0,0.796,0.366,0.87,0.486l29.844,48.504l-29.799,48.431
              c-2.174,3.533-1.072,8.16,2.461,10.334c3.535,2.174,8.161,1.072,10.334-2.461L255.13,211.205c0.074-0.12,0.299-0.486,0.87-0.486
              c0.57,0,0.795,0.366,0.87,0.486l161.848,263.047H93.282z"/>
          </g>
        </svg>

        <Profile user={auth.user} />
      </div>
    );
  }
}

UserMenu.propTypes = {
  user: PropTypes.object,
  onNotification: PropTypes.func
};

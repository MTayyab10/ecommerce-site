import React from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toast, ToastContainer} from "react-toastify";

// font awesome icons
const errorIcon = <i className="fa-solid fa-circle-exclamation me-1"/>
const successIcon = <i className="fa-solid fa-circle-check me-1"/>

export const Alert = ({alerts}) => alerts !== null &&

    alerts.length > 0 && alerts.map(alert => (

        <div key={alert.id}

             className={`alert p-2 m-0 text-center alert-dismissible fade show
              
              ${alert.alertType === "error" ? "alert-danger" :
                 alert.alertType === "success" ? "alert-success" :
                     "alert-info"
             }`}
        >
            {alert.alertType === "error" ? errorIcon : successIcon}

            {alert.msg}

            {/* There is an error if close the Alert then
            It display an error it crashes website  */}

            {/*<button type="button" className="btn-close small pt-4 pb-1"*/}
            {/*        data-bs-dismiss="alert" aria-label="Close"/>*/}

        </div>
    ));

// Alert.propTypes = {
//     alerts: PropTypes.array.isRequired
// };

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, {})(Alert);

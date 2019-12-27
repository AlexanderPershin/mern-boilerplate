import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert, deleteAlert } from '../../actions';

// I added this component to layout component
const Alert = () => {
  //TODO: Animate this component with react-spring
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts);

  const handleDeleteAlert = id => {
    dispatch(deleteAlert(id));
  };

  const renderAlerts = () => {
    if (alerts && alerts.length > 0) {
      return alerts.map(alert => (
        <div key={alert.id} className={`alert__item -${alert.alertType}`}>
          {alert.msg}
          <div
            className='alert__remove'
            onClick={e => handleDeleteAlert(alert.id)}
          >
            &times;
          </div>
        </div>
      ));
    }
  };

  const renderAlert = () => {
    if (alerts && alerts.length > 0) {
      return <div className='alert'>{renderAlerts()}</div>;
    } else {
      return null;
    }
  };

  return renderAlert();
};

export default Alert;

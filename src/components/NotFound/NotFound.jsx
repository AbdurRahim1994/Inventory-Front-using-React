import React from 'react';
import NotFoundImage from '../../assets/images/404.png'

const NotFound = () => {
    return (
        <div>
            <div className='center-screen'>
                <img className='animated fadeInUp' src={NotFoundImage}></img>
            </div>
        </div>
    );
};

export default NotFound;
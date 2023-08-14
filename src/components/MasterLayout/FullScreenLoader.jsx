import React from 'react';
import { useSelector } from 'react-redux';

const FullScreenLoader = () => {
    const setting = useSelector((state) => state.setting.loader)
    return (
        <div className={setting + ' LoadingOverlay'}>
            <div className='Line-Progress'>
                <div className='interminate'>

                </div>
            </div>
        </div>
    );
};

export default FullScreenLoader;
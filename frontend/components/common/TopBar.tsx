import React from 'react';

interface Props{
    name:string
}

const TopBar = (prop:Props) => {
    return (
        <div className={`flex bg-gray-50 justify-end px-2 py-1 text-sm border-b-2`}>
            <span className={`p-1 px-2 rounded-lg bg-gray-100 border-2 border-gray-200`}>{prop.name}</span>
        </div>
    );
};

export default TopBar;

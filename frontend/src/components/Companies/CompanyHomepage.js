
import React, { useState } from 'react';
import Navbar from './Navbar';
import "./styles_companies.css"

const CompanyHomepage = () => {

    return (
        <div className='homepage'>
            <div className='cover-photo' style={{ width: '100%', height: '200px', background: 'url(./teren2.jpg) no-repeat center/cover' }}></div>
            <Navbar></Navbar>
            <div className='content'>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Picture</th>
                        <th>Naziv terena</th>
                        <th>Lokacija</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><img src="your-picture.jpg" alt="Terrain" /></td>
                        <td>Teren 1</td>
                        <td>Lokacija 1</td>
                        <td>Aktivan</td>
                        <td><img src="bin-icon.png" alt="Delete" /></td>
                    </tr>
                    {/* Add more rows here */}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default CompanyHomepage;

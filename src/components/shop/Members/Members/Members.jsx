import React from 'react'
import SearchIndustry from '../SearchIndustry/SearchIndustry';

const Members = () => {
  return (
    <div
      className='p-5 lg:px-32'
      style={{
        backgroundImage: 'url("/companyLogo/gradient.png"), linear-gradient(to right, #5BA353, #FFCC33, #3F6D2A)',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <SearchIndustry />
    </div>
  );
}

export default Members;

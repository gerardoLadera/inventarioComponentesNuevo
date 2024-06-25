import React from 'react';


export default function LinkButton({ children, active, img }) {
  return (
    <div className={`link ${active ? 'active' : ''}`}>
      <img src={img} alt="" />
      <p>
        {children}
      </p>
    </div>
  );
}


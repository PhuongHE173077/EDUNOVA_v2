import React from 'react'
const gradientTextStyle = {
    fontSize: '3xl',
    fontWeight: '700',
    background: 'linear-gradient(90deg, #3b82f6, #14b8a6, #22d3ee)',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 1px 2px rgba(0,0,0,0.15)',
};
export const Logo = () => {
    return (
        <h5 style={gradientTextStyle}>
            EDUNOVA
        </h5>
    )
}

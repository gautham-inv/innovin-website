import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const offices = [
  {
    id: 'trivandrum',
    name: 'Trivandrum',
    location: 'Trivandrum, India',
    company: 'InnoAI Technologies Pvt. Ltd.',
    cin: 'U72900KL2023PTC078123',
    address: 'Technopark Campus, Trivandrum, Kerala, India',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
  },
  {
    id: 'melbourne',
    name: 'Melbourne',
    location: 'Melbourne, Australia',
    company: 'Innovin Labs Australia',
    cin: 'ACN 123 456 789',
    address: '123 Innovation Street, Melbourne, VIC 3000',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=800&q=80',
  },
  {
    id: 'california',
    name: 'California',
    location: 'San Francisco, CA, USA',
    company: 'Innovin Labs Inc.',
    cin: 'EIN 12-3456789',
    address: '456 Tech Avenue, San Francisco, CA 94105',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  },
];

export default function OfficeLocations() {
  const [hoveredId, setHoveredId] = useState('trivandrum');
  const [mobileExpanded, setMobileExpanded] = useState('trivandrum');

  const handleCardClick = (id: string) => {
    setMobileExpanded(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800">
          Our Offices
        </h2>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex gap-4 h-[600px]">
          {offices.map((office) => {
            const isExpanded = hoveredId === office.id;
            
            return (
              <div
                key={office.id}
                onMouseEnter={() => setHoveredId(office.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out ${
                  isExpanded ? 'flex-[2]' : 'flex-[0.5]'
                }`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{ 
                    backgroundImage: `url(${office.image})`,
                    transform: isExpanded ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                
                {/* Dark Overlay */}
                <div 
                  className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                    isExpanded ? 'opacity-30' : 'opacity-60'
                  }`}
                />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  <div className={`transition-all duration-700 ${
                    isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {office.location}
                    </h3>
                    <p className="text-slate-200 text-sm mb-1">{office.company}</p>
                    <p className="text-slate-300 text-xs mb-1">CIN: {office.cin}</p>
                    <p className="text-slate-300 text-xs mb-4">{office.address}</p>
                    
                    <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white hover:bg-white/30 transition-colors">
                      <MapPin size={16} />
                      <span className="text-sm">View on Map</span>
                    </button>
                  </div>
                  
                  {/* Vertical Label for collapsed state */}
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                    isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    <p className="text-white text-2xl font-bold whitespace-nowrap transform -rotate-90">
                      {office.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col gap-4">
          {offices.map((office) => {
            const isExpanded = mobileExpanded === office.id;
            
            return (
              <div
                key={office.id}
                onClick={() => handleCardClick(office.id)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isExpanded ? 'h-[400px]' : 'h-[100px]'
                }`}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${office.image})` }}
                />
                
                {/* Dark Overlay */}
                <div 
                  className={`absolute inset-0 bg-black transition-opacity duration-500 ${
                    isExpanded ? 'opacity-30' : 'opacity-60'
                  }`}
                />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6">
                  {isExpanded ? (
                    <div className="transition-all duration-500">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {office.location}
                      </h3>
                      <p className="text-slate-200 text-sm mb-1">{office.company}</p>
                      <p className="text-slate-300 text-xs mb-1">CIN: {office.cin}</p>
                      <p className="text-slate-300 text-xs mb-4">{office.address}</p>
                      
                      <button className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-white">
                        <MapPin size={16} />
                        <span className="text-sm">View on Map</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xl font-bold">{office.name}</p>
                      <MapPin size={20} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
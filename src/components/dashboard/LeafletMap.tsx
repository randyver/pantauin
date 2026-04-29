'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';
import { Package, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MbgProvinceData } from '@/types/mbg';
import type { SocialPost } from '@/lib/sosmed-dummy-data';

// Marker color logic mirroring the previous implementation
function markerColor(riskScore: number) {
  if (riskScore >= 70) return { bg: '#EF4444', ring: '#FCA5A5' };
  if (riskScore >= 40) return { bg: '#F97316', ring: '#FED7AA' };
  return { bg: '#EAB308', ring: '#FEF08A' };
}

interface LeafletMapProps {
  provinces: { data: MbgProvinceData; coords: { lat: number; lng: number } }[];
  incidents: { post: SocialPost; coords: { lat: number; lng: number } }[];
  selectedProvince: MbgProvinceData | null;
  selectedIncident: SocialPost | null;
  onSelectProvince: (p: MbgProvinceData) => void;
  onSelectIncident: (p: SocialPost) => void;
}

// Small component to fix missing default leaflet marker icons if any, though we use custom ones here.
function MapInitializer() {
  const map = useMap();
  useEffect(() => {
    // Optionally resize observer or map invalidate size
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function LeafletMap({
  provinces,
  incidents,
  selectedProvince,
  selectedIncident,
  onSelectProvince,
  onSelectIncident,
}: LeafletMapProps) {
  
  return (
    <MapContainer
      center={[-2.5489, 118.0149]}
      zoom={5}
      zoomControl={false}
      style={{ height: '100%', width: '100%', zIndex: 0, backgroundColor: '#f8fafc' }}
      className="rounded-3xl"
    >
      {/* 
        Using a light tile layer for a brighter aesthetic.
        CartoDB Positron is a free tile server with a clean light theme.
      */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      
      <MapInitializer />

      {provinces.map(({ data: pd, coords }) => {
        const isSelected = selectedProvince?.provinceId === pd.provinceId;
        const colors = markerColor(pd.riskScore);
        
        // Generate raw HTML for the divIcon
        const html = renderToString(
          <div
            className={cn(
              'relative flex items-center justify-center rounded-full text-white transition-all cursor-pointer shadow-lg',
              isSelected ? 'w-10 h-10 scale-125 z-30 border-2' : 'w-7 h-7 hover:scale-110 z-20 hover:z-30 border-2'
            )}
            style={{ backgroundColor: colors.bg, borderColor: colors.ring }}
          >
            <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ backgroundColor: colors.bg }} />
            <Package className={cn(isSelected ? 'w-5 h-5' : 'w-3.5 h-3.5', 'relative z-10')} />
          </div>
        );

        const customIcon = L.divIcon({
          html,
          className: 'custom-leaflet-icon',
          iconSize: isSelected ? [40, 40] : [28, 28],
          iconAnchor: isSelected ? [20, 20] : [14, 14],
        });

        return (
          <Marker
            key={pd.provinceId}
            position={[coords.lat, coords.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectProvince(pd),
            }}
          />
        );
      })}

      {incidents.map(({ post, coords }) => {
        const isSelected = selectedIncident?.id === post.id;
        
        // Generate raw HTML for the divIcon
        const html = renderToString(
          <div className={cn(
            'relative flex items-center justify-center rounded-full text-white transition-all cursor-pointer shadow-lg',
            isSelected ? 'w-10 h-10 bg-red-600 scale-125 z-30 border-2 border-white' : 'w-7 h-7 bg-red-500 hover:scale-110 z-20 hover:z-30 border-2 border-white'
          )}>
            <AlertTriangle className={cn(isSelected ? 'w-5 h-5' : 'w-3.5 h-3.5')} />
          </div>
        );

        const customIcon = L.divIcon({
          html,
          className: 'custom-leaflet-icon',
          iconSize: isSelected ? [40, 40] : [28, 28],
          iconAnchor: isSelected ? [20, 20] : [14, 14],
        });

        return (
          <Marker
            key={`inc-${post.id}`}
            position={[coords.lat, coords.lng]}
            icon={customIcon}
            eventHandlers={{
              click: () => onSelectIncident(post),
            }}
          />
        );
      })}
    </MapContainer>
  );
}

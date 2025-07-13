import React from 'react';

const SketchfabViewer = () => {
  return (
    <div className="sketchfab-embed-wrapper">
      <iframe
        title="Villa - Modern House With Pool - 2 Bedroom"
        src="https://sketchfab.com/models/35c6623880304df1adb10177a31dcc21/embed?autostart=1&annotations_visible=0"
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        mozAllowFullScreen={true}
        webkitAllowFullScreen={true}
        width="100%"
        height="500"
        style={{ border: 'none', borderRadius: '12px' }}
      ></iframe>
    </div>
  );
};

export default SketchfabViewer;

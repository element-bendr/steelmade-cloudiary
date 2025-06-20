import React from 'react';

interface StylingDebuggerProps {
  chairName: string;
  data: any;
}

/**
 * This component displays styling and data information for debugging purposes
 * Add this to any chair page to see detailed information about its data and styling
 */
export const StylingDebugger: React.FC<StylingDebuggerProps> = ({
  chairName,
  data
}) => {
  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 bg-black bg-opacity-90 text-white max-w-md max-h-96 overflow-auto rounded-tl-lg shadow-xl">
      <h3 className="text-xl font-bold mb-2 text-green-400">Styling Debugger: {chairName}</h3>
      
      <div className="mb-3">
        <h4 className="text-yellow-400 font-medium">Product Data:</h4>
        <div className="pl-2 text-xs space-y-1">
          <p><span className="text-blue-400">ID:</span> {data.id || 'Missing!'}</p>
          <p><span className="text-blue-400">Name:</span> {data.name || 'Missing!'}</p>
          <p><span className="text-blue-400">Price:</span> {data.price || 'Missing!'}</p>
          <p><span className="text-blue-400">Description:</span> {data.description ? 'Present' : 'Missing!'}</p>
          <p><span className="text-blue-400">Image URL:</span> {data.imageUrl ? 'Present' : 'Missing!'}</p>
          <p><span className="text-blue-400">Features:</span> {data.features && data.features.length ? `${data.features.length} features` : 'None'}</p>
          <p><span className="text-blue-400">Variants:</span> {data.variants && data.variants.length ? `${data.variants.length} variants` : 'None'}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <h4 className="text-yellow-400 font-medium">Current Styling:</h4>
        <div className="pl-2 text-xs space-y-1">
          <p><span className="text-blue-400">Container:</span> container mx-auto px-4 py-12 max-w-7xl</p>
          <p><span className="text-blue-400">Grid:</span> grid grid-cols-1 md:grid-cols-2 gap-8</p>
          <p><span className="text-blue-400">Image Container:</span> relative aspect-square overflow-hidden rounded-xl border border-gray-100 shadow-sm</p>
          <p><span className="text-blue-400">Decorator:</span> absolute top-0 right-0 w-16 h-16 bg-red-700 opacity-20 z-10</p>
        </div>
      </div>
      
      <div className="text-right">
        <button
          onClick={() => document.body.classList.toggle('debug-layout')}
          className="text-xs px-2 py-1 bg-purple-700 rounded hover:bg-purple-600"
        >
          Toggle Debug Layout
        </button>
      </div>
    </div>
  );
};

export default StylingDebugger;
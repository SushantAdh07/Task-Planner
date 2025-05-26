import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function TeamSelection({ teams = [] }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-8">
      <div className="w-full max-w-sm space-y-6">
        {/* White Selection Box */}
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          {/* Minimal Header */}
          <div className="space-y-1">
            <h2 className="text-lg font-medium text-gray-800">Select team</h2>
            <p className="text-sm text-gray-500">Choose from your available options</p>
          </div>

          {/* Spacious Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <span className="text-sm text-gray-700">
                {selectedTeam ? selectedTeam.team_name : 'Select...'}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                {teams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => {
                      setSelectedTeam(team);
                      setIsOpen(false);
                    }}
                    className="w-full text-left p-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                  >
                    {team.team_name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Select Button with Ample Space */}
          <div className="pt-4">
            <button
              disabled={!selectedTeam}
              onClick={() => console.log('Selected:', selectedTeam)}
              className={`w-full py-2.5 px-4 rounded-lg text-sm transition-colors
                ${selectedTeam 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* Additional Spacing Element */}
        <div className="text-center">
          <p className="text-xs text-gray-400">Choose carefully - you can change later</p>
        </div>
      </div>
    </div>
  );
}
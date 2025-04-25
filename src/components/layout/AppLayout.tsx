import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import EditorLayout from './EditorLayout';
import { ViewMode } from '../../types';

const AppLayout: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('block');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-full flex-col">
      <Header 
        toggleSidebar={toggleSidebar}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        <EditorLayout viewMode={viewMode} />
      </div>
    </div>
  );
};

export default AppLayout;
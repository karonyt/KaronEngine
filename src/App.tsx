import React from 'react';
import AppLayout from './components/layout/AppLayout';
import { useProjectStore } from './store/projectStore';

function App() {
  const { initialized } = useProjectStore();

  React.useEffect(() => {
    // 初期化フラグを設定
    if (!initialized) {
      useProjectStore.getState().initializeProject();
    }
  }, [initialized]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <AppLayout />
    </div>
  );
}

export default App;
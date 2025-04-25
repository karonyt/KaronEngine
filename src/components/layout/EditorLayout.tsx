import React from 'react';
import BlockEditor from '../editor/BlockEditor';
import CodeEditor from '../editor/CodeEditor';
import GameView from '../editor/GameView';
import { ViewMode } from '../../types';
import { useProjectStore } from '../../store/projectStore';

interface EditorLayoutProps {
  viewMode: ViewMode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ viewMode }) => {
  const { isPlaying } = useProjectStore();
  
  return (
    <div className="flex flex-1 overflow-hidden">
      {isPlaying ? (
        <div className="flex-1 overflow-hidden">
          <GameView isFullscreen={true} />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-hidden border-r border-slate-200">
            {viewMode === 'block' ? <BlockEditor /> : <CodeEditor />}
          </div>
          <div className="w-2/5 overflow-hidden">
            <GameView isFullscreen={false} />
          </div>
        </>
      )}
    </div>
  );
};

export default EditorLayout;
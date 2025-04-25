import React from 'react';
import { Menu, Play, Pause, Save, Upload, Download, Share2, Code, Blocks } from 'lucide-react';
import { Button } from '../ui/Button';
import { ViewMode } from '../../types';
import { useProjectStore } from '../../store/projectStore';

interface HeaderProps {
  toggleSidebar: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, viewMode, setViewMode }) => {
  const { isPlaying, togglePlayMode, projectName, saveProject, loadProject } = useProjectStore();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-2 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label="メニュー"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-blue-600">キッズゲームクリエイター</h1>
          <span className="text-sm text-slate-500">プロジェクト: {projectName}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center rounded-full bg-slate-100 p-1">
            <Button
              variant={viewMode === 'block' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('block')}
              className="rounded-full"
            >
              <Blocks className="mr-1 h-4 w-4" />
              ブロック
            </Button>
            <Button
              variant={viewMode === 'code' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('code')}
              className="rounded-full"
            >
              <Code className="mr-1 h-4 w-4" />
              コード
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => saveProject()}
            title="保存する"
          >
            <Save className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => loadProject()}
            title="読み込む"
          >
            <Upload className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="エクスポート"
          >
            <Download className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="シェアする"
          >
            <Share2 className="h-5 w-5" />
          </Button>

          <Button
            variant={isPlaying ? 'destructive' : 'primary'}
            onClick={togglePlayMode}
            className="ml-2"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-1 h-4 w-4" /> 停止
              </>
            ) : (
              <>
                <Play className="mr-1 h-4 w-4" /> 実行
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
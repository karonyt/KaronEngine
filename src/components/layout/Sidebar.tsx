import React from 'react';
import { Gamepad2, Image, Layers, Music, Settings, Users, PanelLeft } from 'lucide-react';
import { Button } from '../ui/Button';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  if (!isOpen) {
    return (
      <div className="bg-slate-800 text-white w-12 flex flex-col items-center py-4 transition-all duration-300">
        <Button variant="ghost" className="rounded-full p-2 mb-6 text-white hover:bg-slate-700" title="サイドバーを開く">
          <PanelLeft className="h-5 w-5" />
        </Button>
        <SidebarIcon icon={<Gamepad2 />} label="ゲームオブジェクト" />
        <SidebarIcon icon={<Image />} label="画像" />
        <SidebarIcon icon={<Layers />} label="レイヤー" />
        <SidebarIcon icon={<Music />} label="サウンド" />
        <SidebarIcon icon={<Users />} label="キャラクター" />
        <SidebarIcon icon={<Settings />} label="設定" />
      </div>
    );
  }

  return (
    <div className="bg-slate-800 text-white w-64 flex flex-col transition-all duration-300">
      <div className="p-4 border-b border-slate-700">
        <h2 className="font-bold text-lg">ツールボックス</h2>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div className="p-4">
          <h3 className="font-medium mb-2 text-slate-300">ゲームオブジェクト</h3>
          <ul className="space-y-1">
            <SidebarItem label="プレイヤー" />
            <SidebarItem label="敵キャラ" />
            <SidebarItem label="アイテム" />
            <SidebarItem label="背景" />
            <SidebarItem label="障害物" />
          </ul>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-2 text-slate-300">素材</h3>
          <ul className="space-y-1">
            <SidebarItem label="画像" />
            <SidebarItem label="サウンド" />
            <SidebarItem label="アニメーション" />
          </ul>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium mb-2 text-slate-300">ゲーム設定</h3>
          <ul className="space-y-1">
            <SidebarItem label="画面サイズ" />
            <SidebarItem label="物理設定" />
            <SidebarItem label="入力設定" />
          </ul>
        </div>
      </div>
    </div>
  );
};

const SidebarIcon: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center mb-6 cursor-pointer group">
      <div className="rounded-full p-3 bg-slate-700 hover:bg-blue-600 transition-colors">
        {icon}
      </div>
      <div className="absolute left-12 scale-0 rounded bg-slate-900 p-2 text-xs transition-all group-hover:scale-100 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ label: string }> = ({ label }) => {
  return (
    <li className="px-2 py-1 rounded hover:bg-slate-700 cursor-pointer transition-colors">
      {label}
    </li>
  );
};

export default Sidebar;
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export function defineBlocks() {
  // ゲームスプライトの作成ブロック
  Blockly.Blocks['game_create_sprite'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('スプライト作成 名前:')
        .appendField(new Blockly.FieldTextInput('player'), 'NAME');
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('X座標:');
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('Y座標:');
      this.appendDummyInput()
        .appendField('画像:')
        .appendField(new Blockly.FieldDropdown([
          ['プレイヤー', 'player'],
          ['敵', 'enemy'],
          ['アイテム', 'item']
        ]), 'IMAGE');
      this.setColour(160);
      this.setTooltip('ゲーム内にスプライトを作成します');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  // スプライト移動ブロック
  Blockly.Blocks['game_move_sprite'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('スプライト移動 名前:')
        .appendField(new Blockly.FieldTextInput('player'), 'NAME');
      this.appendValueInput('X')
        .setCheck('Number')
        .appendField('X方向:');
      this.appendValueInput('Y')
        .setCheck('Number')
        .appendField('Y方向:');
      this.setColour(160);
      this.setTooltip('スプライトを移動します');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  // スプライト回転ブロック
  Blockly.Blocks['game_rotate_sprite'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('スプライト回転 名前:')
        .appendField(new Blockly.FieldTextInput('player'), 'NAME');
      this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField('角度:');
      this.setColour(160);
      this.setTooltip('スプライトを回転します');
      this.setHelpUrl('');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  };

  // 衝突判定ブロック
  Blockly.Blocks['game_check_collision'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('衝突判定')
        .appendField('スプライトA:')
        .appendField(new Blockly.FieldTextInput('player'), 'SPRITE_A');
      this.appendDummyInput()
        .appendField('スプライトB:')
        .appendField(new Blockly.FieldTextInput('enemy'), 'SPRITE_B');
      this.setColour(210);
      this.setTooltip('2つのスプライト間の衝突を判定します');
      this.setHelpUrl('');
      this.setOutput(true, 'Boolean');
    }
  };

  // キー入力ブロック
  Blockly.Blocks['game_key_pressed'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('キーが押された:')
        .appendField(new Blockly.FieldDropdown([
          ['上矢印', 'ArrowUp'],
          ['下矢印', 'ArrowDown'],
          ['左矢印', 'ArrowLeft'],
          ['右矢印', 'ArrowRight'],
          ['スペース', 'Space'],
          ['Aキー', 'KeyA'],
          ['Bキー', 'KeyB']
        ]), 'KEY');
      this.setColour(210);
      this.setTooltip('特定のキーが押されたかを判定します');
      this.setHelpUrl('');
      this.setOutput(true, 'Boolean');
    }
  };

  // マウスクリックブロック
  Blockly.Blocks['game_mouse_clicked'] = {
    init: function() {
      this.appendDummyInput()
        .appendField('マウスがクリックされた');
      this.setColour(210);
      this.setTooltip('マウスがクリックされたかを判定します');
      this.setHelpUrl('');
      this.setOutput(true, 'Boolean');
    }
  };

  // JavaScriptジェネレーターの定義
  javascriptGenerator['game_create_sprite'] = function(block) {
    const name = block.getFieldValue('NAME');
    const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '0';
    const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '0';
    const image = block.getFieldValue('IMAGE');
    
    return `createSprite("${name}", ${x}, ${y}, "${image}");\n`;
  };

  javascriptGenerator['game_move_sprite'] = function(block) {
    const name = block.getFieldValue('NAME');
    const x = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC) || '0';
    const y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC) || '0';
    
    return `moveSprite("${name}", ${x}, ${y});\n`;
  };

  javascriptGenerator['game_rotate_sprite'] = function(block) {
    const name = block.getFieldValue('NAME');
    const angle = javascriptGenerator.valueToCode(block, 'ANGLE', javascriptGenerator.ORDER_ATOMIC) || '0';
    
    return `rotateSprite("${name}", ${angle});\n`;
  };

  javascriptGenerator['game_check_collision'] = function(block) {
    const spriteA = block.getFieldValue('SPRITE_A');
    const spriteB = block.getFieldValue('SPRITE_B');
    
    return [`checkCollision("${spriteA}", "${spriteB}")`, javascriptGenerator.ORDER_FUNCTION_CALL];
  };

  javascriptGenerator['game_key_pressed'] = function(block) {
    const key = block.getFieldValue('KEY');
    
    return [`isKeyPressed("${key}")`, javascriptGenerator.ORDER_FUNCTION_CALL];
  };

  javascriptGenerator['game_mouse_clicked'] = function() {
    return ['isMouseClicked()', javascriptGenerator.ORDER_FUNCTION_CALL];
  };
}
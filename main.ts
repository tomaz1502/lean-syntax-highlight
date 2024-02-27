import { Plugin } from 'obsidian'

import './mode/lean/lean'

export default class LeanSyntaxHighlightPlugin extends Plugin {

  onload(): void { }

  onunload() {
    delete CodeMirror.modes["lean"];
  }

}

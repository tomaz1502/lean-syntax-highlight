import './styles.scss'
import { Plugin } from 'obsidian'

import './mode/lean/lean'

export default class LeanSyntaxHighlightPlugin extends Plugin {

  modesToKeep = ["hypermd", "markdown", "null", "xml"];

  onload(): void {
      this.app.workspace.onLayoutReady(() => {
        this.refreshLeaves();
      });
  }

  onunload() {
    for (const key in CodeMirror.modes) {
      if (CodeMirror.modes.hasOwnProperty(key) && !this.modesToKeep.includes(key)) {
        delete CodeMirror.modes[key];
      }
    }

    this.refreshLeaves();
  }

  refreshLeaves = () => {
    this.app.workspace.iterateCodeMirrors(cm => cm.setOption("mode", cm.getOption("mode")))
  }
}

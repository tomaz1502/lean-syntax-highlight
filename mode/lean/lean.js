(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"))
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod)
  else
    mod(CodeMirror)
})(function(CodeMirror) {
  "use strict"
  CodeMirror.defineSimpleMode("lean", {
    start: [
      { regex: /\b0b[01]+\b/i, token: "number" },
      { regex: /\b0o[0-7]+\b/i, token: "number" },
      { regex: /\b0x[0-9a-f]+\b/i, token: "number" },
      { regex: /\b-?\d+(?:\.\d+)?(?:e[-+]?\d+)?\b/i, token: "number" },
      { regex: /(?:\/-[\s\S]*?-\/)|(?:--.*$)/m, token: "comment" },
      { regex: /\b(?:show|have|from|suffices|nomatch|set_option|initialize|builtin_initialize|example|universe|universes|variable|variables|import|open|export|theory|prelude|renaming|hiding|exposing|do|by|let|extends|mutual|mut|where|rec|syntax|macro_rules|macro|deriving|fun|section|namespace|end|infix|infixl|infixr|postfix|prefix|notation|if|then|else|calc|match|with|for|in|unless|try|catch|finally|return|continue|break|global|local|scoped|partial|unsafe|private|protected|noncomputable|true|false)\b/, token: "keyword" },
      { regex: /#(print|check|eval|reduce|check_failure)\b/, token: "operator" },
      { regex: /\+|\*|-|\/|:=|>>>|<<<|\^\^\^|&&&|\|\|\||\+\+|\^|%|~~~|<|<=|>|>=|==|=/, token: "operator" },
      { regex: /[()\[\]{},:]/, token: "meta" },
      { regex: /\b(?:sorry|admit)\b/, token: "error" },
      { regex: /(\b(inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class|constant))(\s+)/, token: "keyword", push: "definition" },
      { regex: /"[^"]*"|'[^']'/, token: "string" },
      { regex: /@\[[^\]\n]*\]/, token: "keyword" },
      { regex: /\`[^(\s]*/, token: "operator" }
    ],
    definition: [
      { regex: /(\w+)/, token: "attribute", pop: true }
    ]
  })
});

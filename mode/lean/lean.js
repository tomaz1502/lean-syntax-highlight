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
      { regex: /\b(?:theorem|show|have|from|suffices|nomatch|def|class|structure|instance|set_option|initialize|builtin_initialize|example|inductive|coinductive|axiom|constant|universe|universes|variable|variables|import|open|export|theory|prelude|renaming|hiding|exposing|do|by|let|extends|mutual|mut|where|rec|syntax|macro_rules|macro|deriving|fun|section|namespace|end|infix|infixl|infixr|postfix|prefix|notation|abbrev|if|then|else|calc|match|with|for|in|unless|try|catch|finally|return|continue|break|global|local|scoped|partial|unsafe|private|protected|noncomputable)\b/, token: "keyword" },
      { regex: /#(print|check|eval|reduce|check_failure)/, token: "operator" },
      { regex: /\+|\*|-|\/|:=|>>>|<<<|\^\^\^|&&&|\|\|\||\+\+|\^|%|~~~|<|<=|>|>=|==|=/, token: "operator" },
      { regex: /[()\[\]{},:]/, token: "meta" },
      { regex: /\b(?:true|false)\b/, token: "attribute" },
      { regex: /\b(?:sorry|admit)\b/, token: "operator" },
      // { regex: /(\b(?:inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class|constant))(\s+)(\w+)/, token: ["keyword", null, "function"] }
    ]
  })
});

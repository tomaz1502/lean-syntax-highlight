(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"))
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod)
  else
    mod(CodeMirror)
})(function(CodeMirror) {
  "use strict"

  const keywords =
    [ "show","have","from","suffices","nomatch","set_option","initialize","builtin_initialize","example","universe","universes","variable","variables","import","open","export","theory","prelude","renaming","hiding","exposing","do","by","let","extends","mutual","mut","where","rec","syntax","macro_rules","macro","deriving","fun","section","namespace","end","infix","infixl","infixr","postfix","prefix","notation","if","then","else","calc","match","with","for","in","unless","try","catch","finally","return","continue","break","global","local","scoped","partial","unsafe","private","protected","noncomputable","true","false" ];

  CodeMirror.defineMode("lean", function() {
    return {
      token: function(stream, state) {
        if (stream.eatSpace()) return null;

        if (state.commentLevel > 0) {
          if (stream.match(/.*?\/-/)) {
            state.commentLevel += 1;
          } else if (stream.match(/.*?-\//)) {
            state.commentLevel -= 1;
          } else {
            stream.skipToEnd();
          }
          return "comment";
        }

        if (stream.match(/\/-/)) {
          state.commentLevel += 1;
          return "comment";
        }

        if (stream.match(/--.*/)) {
          return "comment";
        }

        if (stream.match(/\b0b[01]+\b/i) ||
            stream.match(/\b0o[0-7]+\b/i) ||
            stream.match(/\b0x[0-9a-f]+\b/i) ||
            stream.match(/\b-?\d+(?:\.\d+)?(?:e[-+]?\d+)?\b/i)) {
          return "number";
        }

        if (stream.match(new RegExp(`\b(?:${keywords.join("|")})\b`))) {
          return "keyword";
        }

        if (stream.match(/#(print|check|eval|reduce|check_failure)\b/)) {
          return "operator";
        }

        if (stream.match(/\+|\*|-|\/|:=|>>>|<<<|\^\^\^|&&&|\|\|\||\+\+|\^|%|~~~|<|<=|>|>=|==|=/)) {
          return "operator";
        }

        if (stream.match(/[()\[\]{},:]/)) {
          return "meta";
        }

        if (stream.match(/\b(?:sorry|admit)\b/)) {
          return "error";
        }

        if (stream.match(/\b(inductive|coinductive|structure|theorem|axiom|abbrev|lemma|def|instance|class|constant)\b/)) {
          state.inDefinition = true;
          return "keyword";
        }

        if (state.inDefinition && stream.match(/\w+/)) {
          state.inDefinition = false;
          return "attribute";
        }

        if (stream.match(/"[^"\\]*(?:\\.[^"\\]*)*"/)) {
          return "string";
        }

        if (stream.match(/'[^'\\]*(?:\\.[^'\\]*)*'/)) {
          return "string";
        }

        if (stream.match(/@\[[^\]\n]*\]/)) {
          return "keyword";
        }

        if (stream.match(/\`[^(\s]*/)) {
          return "operator";
        }

        stream.next();
        return null;
      },
      startState: function() {
        return { inDefinition: false, commentLevel: 0 };
      }
    };
  });
});

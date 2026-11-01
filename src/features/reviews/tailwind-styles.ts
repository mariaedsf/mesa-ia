const featureTailwindStyles: Record<string, string> = {
  "reviews-page":     "[width:min(100%,_1620px)]! [min-height:100vh]! [margin:0_auto]! [padding:31px_34px_24px]! [color:var(--text)]!" + " " +
    "[background:radial-gradient(ellipse_at_76%_0%,_rgba(255,239,224,.35),_transparent_34%)]! max-[1180px]:[padding-right:23px]! max-[1180px]:[padding-left:23px]! max-[620px]:[padding:20px_14px_17px]!",
  "reviews-page-header":     "[display:flex]! [align-items:flex-start]! [justify-content:space-between]! [margin-bottom:23px]! [gap:20px]!" + " " +
    "max-[900px]:[align-items:flex-start]! max-[900px]:[flex-direction:column]! max-[900px]:[gap:12px]! max-[620px]:[margin-bottom:15px]!",
  "reviews-page-heading":     "[min-width:0]! [&>h1]:[margin:3px_0_4px]! [&>h1]:[font-size:clamp(30px,_2.6vw,_37px)]! [&>h1]:[font-weight:710]! [&>h1]:[letter-spacing:-.06em]!" + " " +
    "[&>h1]:[line-height:1.13]! [&>p]:[margin:5px_0_0]! [&>p]:[color:#65635f]! [&>p]:[font-size:15px]! [&>p]:[letter-spacing:-.02em]!" + " " +
    "[&>p]:[line-height:1.45]! max-[620px]:[&>h1]:[font-size:29px]! max-[620px]:[&>p]:[max-width:520px]! max-[620px]:[&>p]:[font-size:12px]!",
  "reviews-header-actions":     "[flex:0_0_auto]! max-[900px]:[width:100%]! max-[900px]:[justify-content:flex-end]! max-[900px]:[padding-top:0]! max-[620px]:[gap:8px]!",
  "reviews-summary-grid":     "[display:grid]! [grid-template-columns:repeat(4,minmax(0,1fr))]! [margin-bottom:15px]! [gap:13px]! max-[1180px]:[gap:9px]!" + " " +
    "max-[900px]:[grid-template-columns:repeat(2,minmax(0,1fr))]! max-[620px]:[margin-bottom:10px]! max-[620px]:[gap:8px]!",
  "reviews-summary-card":     "[display:flex]! [min-width:0]! [min-height:120px]! [align-items:flex-start]! [padding:17px]!" + " " +
    "[gap:12px]! [border:1px_solid_rgba(50,43,35,.06)]! [border-radius:19px]! [background:linear-gradient(145deg,#fff_12%,#fdfbf9_100%)]! [box-shadow:0_5px_16px_rgba(40,32,25,.045)]!" + " " +
    "max-[1180px]:[min-height:110px]! max-[1180px]:[padding:14px_12px]! max-[1180px]:[gap:9px]! max-[620px]:[min-height:96px]! max-[620px]:[padding:11px_9px]!" + " " +
    "max-[620px]:[gap:7px]! max-[620px]:[border-radius:15px]!",
  "reviews-summary-icon":     "[display:grid]! [width:43px]! [height:43px]! [flex:0_0_43px]! [place-items:center]!" + " " +
    "[border-radius:14px]! [background:#fff1e5]! [color:#ed7417]! [&.gold]:[background:#fff5df]! [&.gold]:[color:#db8c13]!" + " " +
    "[&.green]:[background:#e8f5eb]! [&.green]:[color:#16834c]! [&.violet]:[background:#f1edff]! [&.violet]:[color:#7761c7]! max-[1180px]:[width:39px]!" + " " +
    "max-[1180px]:[height:39px]! max-[1180px]:[flex-basis:39px]! max-[620px]:[width:32px]! max-[620px]:[height:32px]! max-[620px]:[flex-basis:32px]!" + " " +
    "max-[620px]:[border-radius:10px]! max-[620px]:[&>svg]:[width:17px]! max-[620px]:[&>svg]:[height:17px]!",
  "reviews-summary-copy":     "[display:flex]! [min-width:0]! [flex-direction:column]! [gap:3px]! [padding-top:2px]!" + " " +
    "[&>span]:[color:#4e4b46]! [&>span]:[font-size:12px]! [&>span]:[font-weight:560]! [&>strong]:[color:#171614]! [&>strong]:[font-size:27px]!" + " " +
    "[&>strong]:[font-weight:720]! [&>strong]:[letter-spacing:-.055em]! [&>strong]:[line-height:1.18]! [&>small]:[color:#77736e]! [&>small]:[font-size:10px]!" + " " +
    "max-[1180px]:[&>strong]:[font-size:24px]! max-[620px]:[gap:2px]! max-[620px]:[&>span]:[font-size:9px]! max-[620px]:[&>strong]:[font-size:21px]! max-[620px]:[&>small]:[font-size:8px]!" + " " +
    "max-[620px]:[&>small]:[line-height:1.25]!",
  "reviews-table-card":     "[min-width:0]! [overflow:hidden]! [padding:19px_19px_13px]! [border:1px_solid_rgba(50,43,35,.065)]! [border-radius:21px]!" + " " +
    "[background:linear-gradient(145deg,#fff_12%,#fdfbf9_100%)]! [box-shadow:0_5px_17px_rgba(40,32,25,.045)]! max-[620px]:[padding:14px_11px_11px]! max-[620px]:[border-radius:17px]!",
  "reviews-table-heading":     "[display:flex]! [align-items:center]! [justify-content:space-between]! [gap:14px]! [&>div>h2]:[margin:0]!" + " " +
    "[&>div>h2]:[color:#191815]! [&>div>h2]:[font-size:19px]! [&>div>h2]:[font-weight:690]! [&>div>h2]:[letter-spacing:-.045em]! [&>div>p]:[margin:4px_0_0]!" + " " +
    "[&>div>p]:[color:#77736e]! [&>div>p]:[font-size:12px]! max-[620px]:[&>div>h2]:[font-size:16px]! max-[620px]:[&>div>p]:[font-size:10px]!",
  "reviews-result-count":     "[display:inline-flex]! [min-height:27px]! [align-items:center]! [padding:0_10px]! [border:1px_solid_#eeeae5]!" + " " +
    "[border-radius:999px]! [background:#fff]! [color:#5c5852]! [font-size:10px]! [font-weight:620]!" + " " +
    "[white-space:nowrap]! max-[620px]:[min-height:24px]! max-[620px]:[padding:0_7px]! max-[620px]:[font-size:9px]!",
  "reviews-toolbar":     "[display:flex]! [align-items:center]! [margin-top:17px]! [gap:9px]! [&>.reviews-search]:[margin-right:auto]!" + " " +
    "max-[620px]:[flex-wrap:wrap]! max-[620px]:[margin-top:12px]! max-[620px]:[gap:7px]!",
  "reviews-search":     "[display:flex]! [width:min(440px,_100%)]! [min-height:39px]! [align-items:center]! [padding:0_11px]!" + " " +
    "[gap:8px]! [border:1px_solid_#e9e6e1]! [border-radius:12px]! [background:rgba(255,255,255,.72)]! [color:#848078]!" + " " +
    "[transition:border-color_.16s_ease,_box-shadow_.16s_ease]! [&:focus-within]:[border-color:#f2a066]! [&:focus-within]:[box-shadow:0_0_0_3px_rgba(249,115,22,.1)]! [&>input]:[width:100%]! [&>input]:[min-width:0]!" + " " +
    "[&>input]:[border:0]! [&>input]:[outline:0]! [&>input]:[background:transparent]! [&>input]:[color:#25231f]! [&>input]:[font-size:11px]!" + " " +
    "[&>input::placeholder]:[color:#99958e]! [&>button]:[display:grid]! [&>button]:[width:24px]! [&>button]:[height:24px]! [&>button]:[flex:0_0_24px]!" + " " +
    "[&>button]:[place-items:center]! [&>button]:[border:0]! [&>button]:[border-radius:7px]! [&>button]:[background:#f4f1ed]! [&>button]:[color:#716d67]!" + " " +
    "max-[620px]:[width:100%]! max-[620px]:[min-height:37px]! max-[620px]:[order:-1]!",
  "reviews-export-button":     "[min-height:38px]! [padding:0_11px]! [gap:7px]! [border-color:#e9e6e1]! [border-radius:11px]!" + " " +
    "[background:rgba(255,255,255,.7)]! [color:#4b4843]! [font-size:11px]! [font-weight:580]! [&:hover]:[border-color:#f6c8a5]!" + " " +
    "[&:hover]:[background:#fff4eb]! [&:hover]:[color:#b9540c]! [&.selected]:[border-color:#f6c8a5]! [&.selected]:[background:#fff4eb]! [&.selected]:[color:#b9540c]!" + " " +
    "[&.selected>svg]:[color:#e26516]! [&:disabled]:[opacity:.5]! max-[620px]:[min-height:34px]! max-[620px]:[font-size:10px]!",
  "reviews-filter-row":     "[display:flex]! [align-items:center]! [margin:13px_0_11px]! [gap:7px]! max-[620px]:[overflow-x:auto]!" + " " +
    "max-[620px]:[margin:10px_0_9px]! max-[620px]:[gap:5px]! max-[620px]:[scrollbar-width:none]! max-[620px]:[&::-webkit-scrollbar]:[display:none]!",
  "reviews-filter":     "[display:inline-flex]! [min-height:30px]! [align-items:center]! [padding:0_10px]! [gap:7px]!" + " " +
    "[border:1px_solid_transparent]! [border-radius:9px]! [background:#f5f3f0]! [color:#625e58]! [font-size:10px]!" + " " +
    "[font-weight:540]! [transition:color_.16s_ease,_background_.16s_ease,_border-color_.16s_ease]! [&>span]:[display:grid]! [&>span]:[min-width:18px]! [&>span]:[height:18px]!" + " " +
    "[&>span]:[place-items:center]! [&>span]:[padding:0_4px]! [&>span]:[border-radius:6px]! [&>span]:[background:rgba(50,44,36,.07)]! [&>span]:[color:#716c65]!" + " " +
    "[&>span]:[font-size:9px]! [&>span]:[font-weight:620]! [&:hover]:[background:#eeeae5]! [&.active]:[border-color:#e8e5e0]! [&.active]:[background:#fff]!" + " " +
    "[&.active]:[color:#282521]! [&.active]:[box-shadow:0_2px_6px_rgba(40,32,25,.05)]! [&.active]:[font-weight:650]! [&.active>span]:[background:#fff0e5]! [&.active>span]:[color:#c15d18]!" + " " +
    "max-[620px]:[min-height:28px]! max-[620px]:[padding:0_8px]! max-[620px]:[font-size:9px]! max-[620px]:[white-space:nowrap]!",
  "reviews-table-wrap":     "[width:100%]! [overflow:auto]! [border:1px_solid_#eeece8]! [border-radius:13px]! [background:rgba(255,255,255,.56)]!" + " " +
    "[scrollbar-color:#ded9d2_transparent]! [scrollbar-width:thin]!",
  "reviews-table":     "[width:100%]! [min-width:1100px]! [border-collapse:separate]! [border-spacing:0]! [text-align:left]!" + " " +
    "[&>thead]:[background:#faf9f7]! [&>thead>tr>th]:[height:42px]! [&>thead>tr>th]:[padding:0_11px]! [&>thead>tr>th]:[border-bottom:1px_solid_#ebe8e3]! [&>thead>tr>th]:[color:#77736d]!" + " " +
    "[&>thead>tr>th]:[font-size:10px]! [&>thead>tr>th]:[font-weight:620]! [&>thead>tr>th]:[white-space:nowrap]! [&>thead>tr>th:first-child]:[padding-left:14px]! [&>tbody>tr>td:first-child]:[padding-left:14px]!" + " " +
    "[&>thead>tr>th>button]:[display:inline-flex]! [&>thead>tr>th>button]:[align-items:center]! [&>thead>tr>th>button]:[padding:4px_0]! [&>thead>tr>th>button]:[gap:5px]! [&>thead>tr>th>button]:[border:0]!" + " " +
    "[&>thead>tr>th>button]:[background:transparent]! [&>thead>tr>th>button]:[color:inherit]! [&>thead>tr>th>button]:[font:inherit]! [&>thead>tr>th>button]:[cursor:pointer]! [&>thead>tr>th>button:hover]:[color:#c25b16]!" + " " +
    "[&>thead>tr>th>button>svg]:[color:#ed7a25]! [&>thead>tr>th>button>svg.sort-up]:[transform:rotate(180deg)]! [&>tbody>tr]:[cursor:pointer]! [&>tbody>tr]:[transition:background_.14s_ease]! [&>tbody>tr:hover]:[background:#fff7f0]!" + " " +
    "[&>tbody>tr:focus-visible]:[outline:2px_solid_rgba(249,115,22,.45)]! [&>tbody>tr:focus-visible]:[outline-offset:-2px]! [&>tbody>tr>td]:[height:68px]! [&>tbody>tr>td]:[padding:9px_11px]! [&>tbody>tr>td]:[border-bottom:1px_solid_#f0eeeb]!" + " " +
    "[&>tbody>tr>td]:[color:#44413c]! [&>tbody>tr>td]:[font-size:11px]! [&>tbody>tr>td]:[white-space:nowrap]! [&>tbody>tr:last-child>td]:[border-bottom:0]!",
  "reviews-customer":     "[display:inline-flex]! [min-width:145px]! [align-items:center]! [gap:9px]! [&>i]:[display:grid]!" + " " +
    "[&>i]:[width:33px]! [&>i]:[height:33px]! [&>i]:[flex:0_0_33px]! [&>i]:[place-items:center]! [&>i]:[border:1px_solid_rgba(255,255,255,.9)]!" + " " +
    "[&>i]:[border-radius:50%]! [&>i]:[background:linear-gradient(145deg,#f7c9a3,#c7835c)]! [&>i]:[color:#573723]! [&>i]:[font-size:9px]! [&>i]:[font-style:normal]!" + " " +
    "[&>i]:[font-weight:700]! [&>i]:[box-shadow:0_2px_5px_rgba(62,42,27,.1)]! [&>span]:[display:flex]! [&>span]:[min-width:0]! [&>span]:[flex-direction:column]!" + " " +
    "[&>span]:[gap:3px]! [&>span>strong]:[color:#26231f]! [&>span>strong]:[font-size:11px]! [&>span>strong]:[font-weight:630]! [&>span>small]:[color:#99948d]!" + " " +
    "[&>span>small]:[font-size:9px]!",
  "reviews-comment-cell":     "[display:-webkit-box]! [width:300px]! [overflow:hidden]! [color:#5c5853]! [font-size:10px]!" + " " +
    "[line-height:1.45]! [white-space:normal]! [-webkit-box-orient:vertical]! [-webkit-line-clamp:2]!",
  "reviews-item-cell":     "[color:#37332f]! [font-weight:550]!",
  "reviews-rating":     "[display:inline-flex]! [align-items:center]! [gap:5px]! [color:#b27620]! [font-size:11px]!" + " " +
    "[font-weight:690]! [&>svg]:[color:#edae39]!",
  "reviews-sentiment":     "[display:inline-flex]! [min-height:23px]! [align-items:center]! [padding:0_8px]! [gap:5px]!" + " " +
    "[border-radius:999px]! [font-size:9px]! [font-weight:620]! [&>i]:[width:6px]! [&>i]:[height:6px]!" + " " +
    "[&>i]:[border-radius:50%]! [&>i]:[background:currentColor]! [&.positivo]:[background:#e8f5e9]! [&.positivo]:[color:#17824c]! [&.neutro]:[background:#f2f0ed]!" + " " +
    "[&.neutro]:[color:#77736d]! [&.negativo]:[background:#fff0e9]! [&.negativo]:[color:#c6533c]!",
  "reviews-response-status":     "[&>i]:[width:6px]! [&>i]:[height:6px]! [&>i]:[border-radius:50%]! [&>i]:[background:currentColor]! [display:inline-flex]!" + " " +
    "[min-height:22px]! [align-items:center]! [padding:0_7px]! [gap:5px]! [border:1px_solid_#f1e3d8]!" + " " +
    "[border-radius:999px]! [background:#fff8f2]! [color:#bf6a2b]! [font-size:9px]! [font-weight:570]!" + " " +
    "[&.answered]:[border-color:#e5eee6]! [&.answered]:[background:#f1f8f1]! [&.answered]:[color:#37804c]!",
  "reviews-channel":     "[display:inline-flex]! [align-items:center]! [padding:5px_8px]! [border:1px_solid_#efede9]! [border-radius:8px]!" + " " +
    "[background:rgba(255,255,255,.68)]! [color:#67625c]! [font-size:9px]!",
  "reviews-date":     "[color:#77726c]! [font-size:10px]!",
  "reviews-row-open":     "[display:grid]! [width:28px]! [height:28px]! [place-items:center]! [border:0]!" + " " +
    "[border-radius:8px]! [background:transparent]! [color:#938d85]! [&:hover]:[background:#ffebdc]! [&:hover]:[color:#c45b14]!",
  "reviews-empty":     "[height:180px]! [text-align:center]! [white-space:normal]! [&>span]:[display:block]! [&>span]:[margin:4px_auto]!" + " " +
    "[&>strong]:[display:block]! [&>strong]:[margin:4px_auto]! [&>small]:[display:block]! [&>small]:[margin:4px_auto]! [&>span]:[color:#aaa39a]!" + " " +
    "[&>strong]:[color:#49453f]! [&>strong]:[font-size:12px]! [&>small]:[color:#88827b]! [&>small]:[font-size:10px]!",
  "reviews-pagination":     "[display:flex]! [align-items:center]! [justify-content:space-between]! [padding:12px_1px_1px]! [color:#858078]!" + " " +
    "[font-size:10px]! [&>span>strong]:[color:#4b4741]! [&>span>strong]:[font-weight:650]! [&>div]:[display:flex]! [&>div]:[align-items:center]!" + " " +
    "[&>div]:[gap:9px]! max-[620px]:[align-items:flex-start]! max-[620px]:[gap:8px]! max-[620px]:[font-size:9px]! max-[620px]:[&>div]:[gap:6px]!",
  "reviews-page-button":     "[width:29px]! [height:29px]! [border-color:#ebe8e3]! [border-radius:9px]! [background:#fff]!" + " " +
    "[color:#4d4943]!",
  "reviews-page-number":     "[color:#4f4a44]! [font-size:10px]! [font-weight:620]! [&>i]:[padding:0_3px]! [&>i]:[color:#aaa49d]!" + " " +
    "[&>i]:[font-style:normal]! [&>i]:[font-weight:400]!",
  "reviews-demo-note":     "[display:flex]! [align-items:center]! [margin:10px_3px_0]! [gap:7px]! [color:#97928a]!" + " " +
    "[font-size:9px]! [&>i]:[width:5px]! [&>i]:[height:5px]! [&>i]:[border-radius:50%]! [&>i]:[background:#e8a06e]!",
  "reviews-detail-dialog":     "[width:min(470px,_calc(100vw_-_28px))]! [padding:25px]! [border:1px_solid_#eeeae5]! [border-radius:21px]! [background:linear-gradient(150deg,#fff_18%,#fdfaf7)]!" + " " +
    "[box-shadow:0_22px_80px_rgba(38,29,21,.18)]! [&>.dialog-close]:[top:14px]! [&>.dialog-close]:[right:14px]! [&>.dialog-close]:[width:32px]! [&>.dialog-close]:[height:32px]!" + " " +
    "[&>.dialog-close]:[border-radius:10px]! [&>.eyebrow]:[margin:15px_0_6px]! [&>.eyebrow]:[color:#8b837a]! [&>.eyebrow]:[font-size:10px]! [&>.eyebrow]:[font-weight:620]!" + " " +
    "[&>.eyebrow]:[letter-spacing:.045em]! [&>[data-slot=dialog-title]]:[color:#211f1c]! [&>[data-slot=dialog-title]]:[font-size:21px]! [&>[data-slot=dialog-title]]:[font-weight:700]! [&>[data-slot=dialog-title]]:[letter-spacing:-.045em]!" + " " +
    "[&>[data-slot=dialog-title]]:[line-height:1.2]! [&>.dialog-copy]:[margin-top:7px]! [&>.dialog-copy]:[color:#77716a]! [&>.dialog-copy]:[font-size:12px]! [&>.dialog-copy]:[line-height:1.5]!" + " " +
    "max-[620px]:[padding:20px]!",
  "reviews-detail-mark":     "[display:grid]! [width:44px]! [height:44px]! [place-items:center]! [border-radius:14px]!" + " " +
    "[background:#fff1e5]! [color:#e9781c]! [&.positivo]:[background:#e8f5e9]! [&.positivo]:[color:#18834c]! [&.neutro]:[background:#f2f0ed]!" + " " +
    "[&.neutro]:[color:#77736d]! [&.negativo]:[background:#fff0e9]! [&.negativo]:[color:#c6533c]!",
  "reviews-detail-rating":     "[display:flex]! [align-items:center]! [margin:17px_0_13px]! [gap:4px]! [color:#e8a82f]!" + " " +
    "[&>strong]:[margin:0_8px_0_5px]! [&>strong]:[color:#302c27]! [&>strong]:[font-size:13px]!",
  "reviews-detail-comment":     "[margin:0]! [padding:15px]! [border:1px_solid_#f0e8df]! [border-radius:13px]! [background:#fffaf6]!" + " " +
    "[color:#4c4740]! [font-size:13px]! [line-height:1.65]!",
  "reviews-detail-footer":     "[display:flex]! [align-items:center]! [justify-content:space-between]! [margin-top:17px]! [gap:10px]!" + " " +
    "max-[620px]:[align-items:flex-start]! max-[620px]:[flex-direction:column]!",
  "reviews-response-button":     "[min-height:36px]! [padding:0_11px]! [gap:7px]! [border:1px_solid_#f5d7c2]! [border-radius:10px]!" + " " +
    "[background:#fff3e9]! [color:#b95213]! [font-size:10px]! [font-weight:620]! [&:hover]:[background:#ffeadb]!" + " " +
    "[&.done]:[border-color:#e1ece3]! [&.done]:[background:#f1f8f1]! [&.done]:[color:#287743]!",
};

export function reviewsClassName(className: string) {
  return className
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const utilities = featureTailwindStyles[token];
      if (token.startsWith("#")) return utilities ?? "";
      return utilities ? `${token} ${utilities}` : token;
    })
    .filter(Boolean)
    .join(" ");
}

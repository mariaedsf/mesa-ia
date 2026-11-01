const featureTailwindStyles: Record<string, string> = {
  "menu-page":     "[width:min(100%,_1620px)]! [margin:0_auto]! [padding:29px_26px_20px]! [color:var(--text)]! [background:radial-gradient(ellipse_at_73%_2%,_rgba(255,239,224,.3),_transparent_33%)]!" + " " +
    "max-[1240px]:[padding-right:20px]! max-[1240px]:[padding-left:20px]! max-[700px]:[padding:20px_15px_17px]! max-[430px]:[padding-right:11px]! max-[430px]:[padding-left:11px]!",
  "menu-page-header":     "[display:flex]! [align-items:flex-start]! [justify-content:space-between]! [margin-bottom:20px]! [gap:20px]!" + " " +
    "max-[900px]:[align-items:flex-start]! max-[900px]:[flex-direction:column]! max-[900px]:[gap:12px]! max-[700px]:[margin-bottom:14px]!",
  "menu-page-heading":     "[min-width:0]! [&>h1]:[margin:4px_0_3px]! [&>h1]:[font-size:clamp(32px,_3vw,_40px)]! [&>h1]:[font-weight:710]! [&>h1]:[letter-spacing:-.06em]!" + " " +
    "[&>h1]:[line-height:1.1]! [&>p]:[margin:6px_0_0]! [&>p]:[color:#65635f]! [&>p]:[font-size:15px]! [&>p]:[letter-spacing:-.02em]!" + " " +
    "[&>p]:[line-height:1.4]! max-[700px]:[&>h1]:[font-size:30px]! max-[700px]:[&>p]:[max-width:500px]! max-[700px]:[&>p]:[font-size:12px]!",
  "menu-header-actions":     "[flex:0_0_auto]! max-[900px]:[width:100%]! max-[900px]:[justify-content:flex-end]! max-[900px]:[padding-top:0]!",
  "menu-tabs":     "[display:grid]! [width:min(890px,_100%)]! [min-height:51px]! [grid-template-columns:repeat(4,_minmax(0,_1fr))]! [padding:4px]!" + " " +
    "[gap:3px]! [border:1px_solid_#e8e5e0]! [border-radius:18px]! [background:rgba(255,255,255,.52)]! [box-shadow:0_3px_10px_rgba(38,31,24,.035)]!" + " " +
    "max-[700px]:[grid-template-columns:repeat(2,minmax(0,1fr))]! max-[700px]:[min-height:88px]! max-[700px]:[border-radius:16px]!",
  "menu-tab":     "[display:inline-flex]! [min-width:0]! [align-items:center]! [justify-content:center]! [padding:0_12px]!" + " " +
    "[gap:10px]! [border:0]! [border-radius:14px]! [background:transparent]! [color:#34312d]!" + " " +
    "[font-size:13px]! [font-weight:550]! [white-space:nowrap]! [cursor:pointer]! [transition:color_.16s_ease,_background_.16s_ease,_box-shadow_.16s_ease]!" + " " +
    "[&>svg]:[flex:0_0_auto]! [&>svg]:[color:#595651]! [&:hover]:[background:#f7f4f0]! [&.active]:[background:linear-gradient(110deg,_#ff8724,_#f36b0a)]! [&.active]:[color:white]!" + " " +
    "[&.active]:[font-weight:650]! [&.active]:[box-shadow:0_3px_8px_rgba(223,98,19,.2)]! [&.active>svg]:[color:white]! max-[700px]:[min-height:37px]! max-[700px]:[padding:0_6px]!" + " " +
    "max-[700px]:[gap:7px]! max-[700px]:[border-radius:11px]! max-[700px]:[font-size:10px]! max-[700px]:[&>svg]:[width:17px]! max-[700px]:[&>svg]:[height:17px]!",
  "menu-metrics-grid":     "[display:grid]! [grid-template-columns:repeat(4,_minmax(0,_1fr))]! [margin:16px_0_14px]! [gap:14px]! max-[1240px]:[gap:10px]!" + " " +
    "max-[900px]:[grid-template-columns:repeat(2,minmax(0,1fr))]! max-[700px]:[margin-top:10px]! max-[700px]:[margin-bottom:10px]! max-[700px]:[gap:8px]!",
  "menu-metric-card":     "[position:relative]! [display:flex]! [min-width:0]! [min-height:164px]! [align-items:flex-start]!" + " " +
    "[overflow:hidden]! [padding:16px_17px]! [gap:13px]! [border:1px_solid_rgba(50,43,35,.06)]! [border-radius:20px]!" + " " +
    "[background:linear-gradient(145deg,#fff_12%,#fdfbf9_100%)]! [box-shadow:0_5px_16px_rgba(40,32,25,.045)]! max-[1240px]:[min-height:148px]! max-[1240px]:[padding:14px_12px]! max-[1240px]:[gap:9px]!" + " " +
    "max-[700px]:[min-height:124px]! max-[700px]:[padding:11px]! max-[700px]:[gap:8px]! max-[700px]:[border-radius:16px]! max-[430px]:[min-height:115px]!" + " " +
    "max-[430px]:[padding:9px]! max-[430px]:[gap:6px]!",
  "menu-metric-icon":     "[display:grid]! [width:51px]! [height:51px]! [flex:0_0_51px]! [place-items:center]!" + " " +
    "[border-radius:15px]! [background:#fff3e7]! [color:#f47714]! max-[1240px]:[width:43px]! max-[1240px]:[height:43px]!" + " " +
    "max-[1240px]:[flex-basis:43px]! max-[700px]:[width:36px]! max-[700px]:[height:36px]! max-[700px]:[flex-basis:36px]! max-[700px]:[border-radius:11px]!" + " " +
    "max-[700px]:[&>svg]:[width:18px]! max-[700px]:[&>svg]:[height:18px]! max-[430px]:[width:31px]! max-[430px]:[height:31px]! max-[430px]:[flex-basis:31px]!",
  "menu-metric-copy":     "[display:flex]! [min-width:0]! [flex-direction:column]! [align-items:flex-start]! [padding-top:6px]!" + " " +
    "[gap:4px]! [&>span]:[color:#393632]! [&>span]:[font-size:12px]! [&>span]:[font-weight:560]! [&>strong]:[color:#171614]!" + " " +
    "[&>strong]:[font-size:26px]! [&>strong]:[font-weight:710]! [&>strong]:[letter-spacing:-.055em]! [&>strong]:[line-height:1.2]! [&>small]:[display:inline-flex]!" + " " +
    "[&>small]:[min-height:26px]! [&>small]:[align-items:center]! [&>small]:[padding:0_9px]! [&>small]:[gap:4px]! [&>small]:[border-radius:999px]!" + " " +
    "[&>small]:[background:#e3f4e4]! [&>small]:[color:#138235]! [&>small]:[font-size:11px]! [&>small]:[font-weight:680]! [&>p]:[margin:1px_0_0]!" + " " +
    "[&>p]:[color:#65615c]! [&>p]:[font-size:10px]! max-[700px]:[padding-top:2px]! max-[700px]:[gap:4px]! max-[700px]:[&>span]:[font-size:9px]!" + " " +
    "max-[700px]:[&>strong]:[font-size:20px]! max-[700px]:[&>small]:[min-height:22px]! max-[700px]:[&>small]:[padding:0_6px]! max-[700px]:[&>small]:[font-size:9px]! max-[700px]:[&>p]:[font-size:8px]!" + " " +
    "max-[430px]:[&>strong]:[font-size:18px]!",
  "menu-metric-sparkline":     "[position:absolute]! [right:15px]! [bottom:37px]! [width:78px]! [height:34px]!" + " " +
    "[overflow:visible]! [&>path]:[fill:none]! [&>path]:[stroke:#fa7412]! [&>path]:[stroke-width:2.2]! [&>path]:[stroke-linecap:round]!" + " " +
    "max-[700px]:[right:8px]! max-[700px]:[bottom:17px]! max-[700px]:[width:53px]! max-[700px]:[height:24px]! max-[430px]:[right:5px]!" + " " +
    "max-[430px]:[bottom:12px]! max-[430px]:[width:43px]!",
  "menu-content-grid":     "[display:grid]! [min-width:0]! [min-height:566px]! [grid-template-columns:minmax(0,_.98fr)_minmax(0,_1.1fr)_minmax(280px,_.83fr)]! [grid-template-rows:minmax(245px,_.92fr)_minmax(280px,_1.08fr)]!" + " " +
    "[gap:12px]! max-[1240px]:[grid-template-columns:repeat(2,minmax(0,1fr))]! max-[1240px]:[grid-template-rows:auto_auto_auto]! max-[1240px]:[min-height:0]! max-[700px]:[grid-template-columns:minmax(0,1fr)]!" + " " +
    "max-[700px]:[grid-template-rows:auto]! max-[700px]:[gap:9px]!",
  "menu-panel":     "[min-width:0]! [padding:17px_17px_14px]! [border:1px_solid_rgba(50,43,35,.06)]! [border-radius:20px]! [background:linear-gradient(145deg,#fff_13%,#fdfbf9_100%)]!" + " " +
    "[box-shadow:0_5px_17px_rgba(40,32,25,.045)]! [&>.card-heading]:[min-height:31px]! [&>.card-heading]:[align-items:center]! [&>.card-heading>h2]:[margin:0]! [&>.card-heading>h2]:[color:#171614]!" + " " +
    "[&>.card-heading>h2]:[font-size:17px]! [&>.card-heading>h2]:[font-weight:680]! [&>.card-heading>h2]:[letter-spacing:-.045em]! [&>.card-heading>h2]:[line-height:1.25]! max-[700px]:[padding:14px_12px_11px]!" + " " +
    "max-[700px]:[border-radius:17px]! max-[700px]:[&>.card-heading>h2]:[font-size:15px]!",
  "menu-sellers-card":     "[grid-column:1]! [grid-row:1_/_span_2]! max-[1240px]:[grid-column:1]! max-[1240px]:[grid-row:1]! max-[1240px]:[min-height:430px]!" + " " +
    "max-[700px]:[grid-column:1]! max-[700px]:[grid-row:auto]! max-[700px]:[min-height:0]!",
  "menu-sellers-list":     "[display:flex]! [flex-direction:column]! [margin-top:7px]!",
  "menu-item-row":     "[display:flex]! [width:100%]! [min-width:0]! [min-height:81px]! [align-items:center]!" + " " +
    "[padding:7px_1px]! [gap:10px]! [border:0]! [border-bottom:1px_solid_#f0eeeb]! [background:transparent]!" + " " +
    "[color:#22201e]! [text-align:left]! [cursor:pointer]! [transition:background_.15s_ease]! [&:last-child]:[border-bottom:0]!" + " " +
    "[&:hover]:[background:#fff8f2]! max-[700px]:[min-height:69px]! max-[700px]:[gap:7px]!",
  "menu-item-rank":     "[display:grid]! [width:27px]! [height:27px]! [flex:0_0_27px]! [place-items:center]!" + " " +
    "[border-radius:50%]! [background:#f0efed]! [color:#292724]! [font-size:11px]! [font-weight:670]!" + " " +
    "[&.first]:[background:#ff861b]! [&.first]:[color:#fff]! max-[700px]:[width:23px]! max-[700px]:[height:23px]! max-[700px]:[flex-basis:23px]!" + " " +
    "max-[700px]:[font-size:10px]!",
  "menu-dish-thumbnail":     "[position:relative]! [display:block]! [width:62px]! [height:58px]! [flex:0_0_62px]!" + " " +
    "[overflow:hidden]! [border-radius:11px]! [background-color:#bc9974]! [background-image:linear-gradient(0deg,rgba(25,16,10,.12),rgba(255,255,255,0)),url('/images/mesa-hero.png')]! [background-size:cover]!" + " " +
    "[box-shadow:inset_0_0_0_1px_rgba(25,18,12,.06)]! [&::after]:[position:absolute]! [&::after]:[inset:0]! [&::after]:[border:1px_solid_rgba(255,255,255,.22)]! [&::after]:[border-radius:inherit]!" + " " +
    "[&::after]:[content:'']! [&.olive]:[filter:saturate(.88)_hue-rotate(12deg)]! [&.gold]:[filter:saturate(1.16)_hue-rotate(-13deg)]! [&.rose]:[filter:saturate(.9)_hue-rotate(-24deg)]! [&.green]:[filter:saturate(1.05)_hue-rotate(25deg)]!" + " " +
    "[&.chocolate]:[filter:saturate(.95)_brightness(.9)]! max-[700px]:[width:48px]! max-[700px]:[height:45px]! max-[700px]:[flex-basis:48px]! max-[700px]:[border-radius:9px]!",
  "menu-item-copy":     "[display:flex]! [min-width:0]! [flex:1]! [flex-direction:column]! [gap:4px]!" + " " +
    "[&>strong]:[overflow:hidden]! [&>strong]:[color:#22201e]! [&>strong]:[font-size:12px]! [&>strong]:[font-weight:660]! [&>strong]:[letter-spacing:-.02em]!" + " " +
    "[&>strong]:[text-overflow:ellipsis]! [&>strong]:[white-space:nowrap]! [&>small]:[color:#625e59]! [&>small]:[font-size:11px]! max-[700px]:[&>strong]:[font-size:10px]!" + " " +
    "max-[700px]:[&>small]:[font-size:9px]!",
  "menu-item-change":     "[display:inline-flex]! [flex:0_0_auto]! [align-items:center]! [padding:5px_8px]! [gap:3px]!" + " " +
    "[border-radius:999px]! [background:#e7f5e8]! [color:#15813a]! [font-size:10px]! [font-weight:680]!" + " " +
    "[&.negative]:[background:#ffebe8]! [&.negative]:[color:#bd4335]! max-[700px]:[padding:4px_6px]! max-[700px]:[font-size:9px]! max-[700px]:[&>svg]:[width:14px]!" + " " +
    "max-[700px]:[&>svg]:[height:14px]! max-[430px]:[padding:4px_5px]! max-[430px]:[font-size:8px]!",
  "menu-item-chevron":     "[flex:0_0_auto]! [color:#69645e]! max-[700px]:[width:14px]! max-[700px]:[height:14px]!",
  "menu-category-card":     "[grid-column:2]! [grid-row:1]! max-[1240px]:[grid-column:2]! max-[1240px]:[grid-row:1]! max-[1240px]:[min-height:220px]!" + " " +
    "max-[700px]:[grid-column:1]! max-[700px]:[grid-row:auto]!",
  "menu-category-layout":     "[display:grid]! [min-width:0]! [grid-template-columns:minmax(145px,_.86fr)_minmax(0,_1fr)]! [align-items:center]! [margin-top:11px]!" + " " +
    "[gap:13px]! max-[700px]:[grid-template-columns:minmax(130px,.9fr)_minmax(0,1fr)]! max-[700px]:[gap:5px]! max-[430px]:[grid-template-columns:minmax(112px,.8fr)_minmax(0,1fr)]!",
  "menu-donut-wrap":     "[position:relative]! [width:100%]! [max-width:180px]! [aspect-ratio:1]! [margin:0_auto]!" + " " +
    "max-[700px]:[max-width:148px]! max-[430px]:[max-width:126px]!",
  "menu-donut-chart":     "[display:block]! [width:100%]! [height:100%]! [aspect-ratio:1]!",
  "menu-donut-center":     "[position:absolute]! [inset:0]! [display:flex]! [flex-direction:column]! [align-items:center]!" + " " +
    "[justify-content:center]! [pointer-events:none]! [&>strong]:[color:#191816]! [&>strong]:[font-size:23px]! [&>strong]:[font-weight:700]!" + " " +
    "[&>strong]:[letter-spacing:-.045em]! [&>span]:[color:#4e4b46]! [&>span]:[font-size:12px]! max-[430px]:[&>strong]:[font-size:19px]!",
  "menu-category-legend":     "[display:flex]! [flex-direction:column]! [gap:12px]! [&>div]:[display:grid]! [&>div]:[grid-template-columns:12px_minmax(0,1fr)_auto]!" + " " +
    "[&>div]:[align-items:center]! [&>div]:[gap:8px]! [&>div]:[color:#302e2a]! [&>div]:[font-size:11px]! [&>div>i]:[width:10px]!" + " " +
    "[&>div>i]:[height:10px]! [&>div>i]:[border-radius:50%]! [&>div>strong]:[color:#181715]! [&>div>strong]:[font-size:11px]! [&>div>strong]:[font-weight:670]!" + " " +
    "max-[700px]:[gap:9px]! max-[700px]:[&>div]:[font-size:9px]! max-[700px]:[&>div>strong]:[font-size:9px]! max-[430px]:[&>div]:[grid-template-columns:9px_minmax(0,1fr)_auto]! max-[430px]:[&>div]:[gap:5px]!" + " " +
    "max-[430px]:[&>div]:[font-size:8px]!",
  "menu-sales-card":     "[grid-column:2]! [grid-row:2]! [padding-bottom:10px]! max-[1240px]:[grid-column:2]! max-[1240px]:[grid-row:2]!" + " " +
    "max-[1240px]:[min-height:250px]! max-[700px]:[grid-column:1]! max-[700px]:[grid-row:auto]!",
  "menu-sales-heading":     "[display:flex]! [align-items:center]! [justify-content:space-between]! [padding:0]! [gap:8px]!" + " " +
    "[&>h2]:[margin:0]! [&>h2]:[color:#171614]! [&>h2]:[font-size:17px]! [&>h2]:[font-weight:680]! [&>h2]:[letter-spacing:-.045em]!" + " " +
    "max-[700px]:[&>h2]:[font-size:15px]!",
  "menu-chart-legend":     "[display:inline-flex]! [flex:0_0_auto]! [align-items:center]! [gap:11px]! [color:#4a4742]!" + " " +
    "[font-size:9px]! [&>span]:[display:inline-flex]! [&>span]:[align-items:center]! [&>span]:[gap:5px]! [&>span]:[white-space:nowrap]!" + " " +
    "[&>span>i]:[width:9px]! [&>span>i]:[height:9px]! [&>span>i]:[border-radius:50%]! [&>span>i]:[background:#d0ceca]! [&>span>i.current]:[background:#f97316]!" + " " +
    "max-[700px]:[gap:7px]! max-[700px]:[font-size:8px]!",
  "menu-sales-chart":     "[display:block]! [width:100%]! [height:calc(100%_-_32px)]! [min-height:205px]! [margin-top:5px]!" + " " +
    "[aspect-ratio:auto]! max-[700px]:[min-height:190px]!",
  "menu-insights-card":     "[display:flex]! [min-height:0]! [grid-column:3]! [grid-row:1_/_span_2]! [flex-direction:column]!" + " " +
    "[&>.card-heading>h2]:[display:inline-flex]! [&>.card-heading>h2]:[align-items:center]! [&>.card-heading>h2]:[gap:7px]! max-[1240px]:[grid-column:1_/_-1]! max-[1240px]:[grid-row:3]!" + " " +
    "max-[1240px]:[min-height:0]! max-[700px]:[grid-column:1]! max-[700px]:[grid-row:auto]!",
  "menu-insights-sparkle":     "[color:#ff8c26]! [fill:#ff8c26]!",
  "menu-insights-list":     "[display:flex]! [flex:1]! [flex-direction:column]! [margin:4px_0_12px]! max-[1240px]:[display:grid]!" + " " +
    "max-[1240px]:[grid-template-columns:repeat(3,minmax(0,1fr))]! max-[1240px]:[gap:10px]! max-[700px]:[display:flex]! max-[700px]:[grid-template-columns:1fr]! max-[700px]:[gap:0]!",
  "menu-insight-row":     "[display:grid]! [min-width:0]! [min-height:101px]! [grid-template-columns:46px_minmax(0,1fr)_14px]! [align-items:center]!" + " " +
    "[padding:9px_0]! [gap:10px]! [border:0]! [border-bottom:1px_solid_#f0eeeb]! [background:transparent]!" + " " +
    "[color:inherit]! [text-align:left]! [cursor:pointer]! [&:last-child]:[border-bottom:0]! [&>svg]:[color:#77716b]!" + " " +
    "[&:hover>.menu-insight-copy>strong]:[color:#bd5b18]! max-[1240px]:[min-height:96px]! max-[1240px]:[grid-template-columns:39px_minmax(0,1fr)]! max-[1240px]:[padding:7px]! max-[1240px]:[gap:8px]!" + " " +
    "max-[1240px]:[border:1px_solid_#f0eeeb]! max-[1240px]:[border-radius:12px]! max-[1240px]:[&>svg]:[display:none]! max-[700px]:[min-height:82px]! max-[700px]:[grid-template-columns:39px_minmax(0,1fr)_13px]!" + " " +
    "max-[700px]:[padding:8px_0]! max-[700px]:[border:0]! max-[700px]:[border-bottom:1px_solid_#f0eeeb]! max-[700px]:[border-radius:0]! max-[700px]:[&>svg]:[display:block]!",
  "menu-insight-icon":     "[display:grid]! [width:44px]! [height:44px]! [place-items:center]! [border-radius:15px]!" + " " +
    "[&.green]:[background:#e8f5e9]! [&.green]:[color:#18853a]! [&.orange]:[background:#fff0e3]! [&.orange]:[color:#ec791b]! [&.red]:[background:#ffebe8]!" + " " +
    "[&.red]:[color:#d85142]! max-[1240px]:[width:37px]! max-[1240px]:[height:37px]! max-[1240px]:[border-radius:12px]! max-[700px]:[width:36px]!" + " " +
    "max-[700px]:[height:36px]!",
  "menu-insight-copy":     "[display:flex]! [min-width:0]! [flex-direction:column]! [gap:5px]! [&>strong]:[color:#211f1d]!" + " " +
    "[&>strong]:[font-size:12px]! [&>strong]:[font-weight:680]! [&>strong]:[letter-spacing:-.02em]! [&>small]:[color:#595550]! [&>small]:[font-size:10px]!" + " " +
    "[&>small]:[line-height:1.5]! max-[700px]:[&>div>strong]:[font-size:11px]! max-[700px]:[&>small]:[font-size:9px]!",
  "menu-ai-button":     "[display:flex]! [width:100%]! [min-height:48px]! [align-items:center]! [justify-content:center]!" + " " +
    "[padding:0_12px]! [gap:9px]! [border:0]! [border-radius:14px]! [background:linear-gradient(110deg,#ff8724,#f36b0a)]!" + " " +
    "[color:white]! [font-size:12px]! [font-weight:650]! [box-shadow:0_4px_12px_rgba(223,98,19,.16)]! [&:hover]:[background:linear-gradient(110deg,#f67c19,#e96105)]!" + " " +
    "max-[700px]:[min-height:43px]! max-[700px]:[margin-top:3px]! max-[700px]:[font-size:10px]!",
  "#menu-tabpanel":     "[min-width:0]!",
  "menu-page-footnote":     "[padding:11px_2px_0]! [color:#a19c95]! [font-size:9px]!",
  "menu-list-view":     "[min-height:510px]! max-[700px]:[min-height:0]! max-[700px]:[padding:13px_10px]!",
  "menu-list-heading":     "[display:flex]! [align-items:center]! [justify-content:space-between]! [padding:1px_1px_14px]! [gap:20px]!" + " " +
    "[border-bottom:1px_solid_#f0eeeb]! [&>div>h2]:[margin:0]! [&>div>h2]:[color:#191816]! [&>div>h2]:[font-size:19px]! [&>div>h2]:[font-weight:680]!" + " " +
    "[&>div>h2]:[letter-spacing:-.045em]! [&>div>p]:[margin:5px_0_0]! [&>div>p]:[color:#6b6761]! [&>div>p]:[font-size:12px]! max-[700px]:[align-items:flex-start]!" + " " +
    "max-[700px]:[flex-direction:column]! max-[700px]:[padding-bottom:10px]! max-[700px]:[gap:10px]! max-[700px]:[&>div>h2]:[font-size:17px]! max-[700px]:[&>div>p]:[font-size:10px]!",
  "menu-view-heading":     "[&>div>h2]:[margin:0]! [&>div>h2]:[color:#191816]! [&>div>h2]:[font-size:19px]! [&>div>h2]:[font-weight:680]! [&>div>h2]:[letter-spacing:-.045em]!" + " " +
    "[&>div>p]:[margin:5px_0_0]! [&>div>p]:[color:#6b6761]! [&>div>p]:[font-size:12px]! [display:flex]! [align-items:center]!" + " " +
    "[padding:0_1px_14px]! [gap:12px]! max-[700px]:[&>div>h2]:[font-size:17px]! max-[700px]:[&>div>p]:[font-size:10px]! max-[700px]:[&>div>p]:[line-height:1.45]!",
  "menu-search":     "[display:flex]! [width:min(260px,_45%)]! [height:38px]! [align-items:center]! [padding:0_11px]!" + " " +
    "[gap:8px]! [border:1px_solid_#eae7e2]! [border-radius:12px]! [background:#fff]! [color:#77716b]!" + " " +
    "[&:focus-within]:[border-color:#efb17d]! [&:focus-within]:[box-shadow:0_0_0_3px_rgba(249,115,22,.08)]! [&>input]:[width:100%]! [&>input]:[min-width:0]! [&>input]:[border:0]!" + " " +
    "[&>input]:[outline:0]! [&>input]:[background:transparent]! [&>input]:[color:#272522]! [&>input]:[font:inherit]! [&>input]:[font-size:11px]!" + " " +
    "max-[700px]:[width:100%]! max-[700px]:[height:35px]!",
  "menu-table-heading":     "[display:grid]! [grid-template-columns:minmax(220px,_1.8fr)_minmax(150px,_1.2fr)_minmax(80px,_.55fr)_minmax(95px,_.65fr)_minmax(90px,_.65fr)]! [align-items:center]! [gap:14px]! [min-height:39px]!" + " " +
    "[padding:0_8px]! [color:#77716b]! [font-size:10px]! max-[700px]:[display:none]!",
  "menu-analysis-row":     "[display:grid]! [grid-template-columns:minmax(220px,_1.8fr)_minmax(150px,_1.2fr)_minmax(80px,_.55fr)_minmax(95px,_.65fr)_minmax(90px,_.65fr)]! [align-items:center]! [gap:14px]! [width:100%]!" + " " +
    "[min-height:68px]! [padding:7px_8px]! [border:0]! [border-bottom:1px_solid_#f0eeeb]! [background:transparent]!" + " " +
    "[color:#35322e]! [font-size:11px]! [text-align:left]! [cursor:pointer]! [&:hover]:[background:#fff8f2]!" + " " +
    "[&>span:not(.menu-analysis-dish)]:[overflow:hidden]! [&>span:not(.menu-analysis-dish)]:[text-overflow:ellipsis]! [&>span:not(.menu-analysis-dish)]:[white-space:nowrap]! [&>span:nth-child(4)]:[display:inline-flex]! [&>span:nth-child(4)]:[align-items:center]!" + " " +
    "[&>span:nth-child(4)]:[gap:4px]! max-[700px]:[grid-template-columns:minmax(0,1fr)_auto]! max-[700px]:[min-height:62px]! max-[700px]:[gap:7px]! max-[700px]:[padding:7px_4px]!" + " " +
    "max-[700px]:[&>span:nth-child(2)]:[display:none]! max-[700px]:[&>span:nth-child(4)]:[display:none]! max-[700px]:[&>span:nth-child(3)]:[justify-self:end]!",
  "menu-management-row":     "[display:grid]! [grid-template-columns:minmax(220px,_1.8fr)_minmax(150px,_1.2fr)_minmax(80px,_.55fr)_minmax(95px,_.65fr)_minmax(90px,_.65fr)]! [align-items:center]! [gap:14px]! [width:100%]!" + " " +
    "[min-height:68px]! [padding:7px_8px]! [border:0]! [border-bottom:1px_solid_#f0eeeb]! [background:transparent]!" + " " +
    "[color:#35322e]! [font-size:11px]! [text-align:left]! [&.unavailable]:[opacity:.62]! max-[700px]:[grid-template-columns:minmax(0,1fr)_auto]!" + " " +
    "max-[700px]:[min-height:62px]! max-[700px]:[gap:7px]! max-[700px]:[padding:7px_4px]! max-[700px]:[&>span:nth-child(2)]:[display:none]! max-[700px]:[&>span:nth-child(4)]:[display:none]!" + " " +
    "max-[700px]:[&>span:nth-child(3)]:[display:block]! max-[700px]:[&>span:nth-child(3)]:[grid-column:2]! max-[700px]:[&>span:nth-child(3)]:[grid-row:2]! max-[700px]:[&>span:nth-child(3)]:[justify-self:end]! max-[700px]:[&>span:nth-child(3)]:[font-size:9px]!",
  "menu-analysis-dish":     "[display:flex]! [min-width:0]! [align-items:center]! [gap:10px]! [border:0]!" + " " +
    "[background:transparent]! [color:#252320]! [text-align:left]! [&>.menu-dish-thumbnail]:[width:49px]! [&>.menu-dish-thumbnail]:[height:45px]!" + " " +
    "[&>.menu-dish-thumbnail]:[flex-basis:49px]! [&>strong]:[overflow:hidden]! [&>div>strong]:[font-size:11px]! [&>strong]:[font-weight:640]! [&>strong]:[text-overflow:ellipsis]!" + " " +
    "[&>strong]:[white-space:nowrap]! max-[700px]:[&>.menu-dish-thumbnail]:[width:41px]! max-[700px]:[&>.menu-dish-thumbnail]:[height:38px]! max-[700px]:[&>.menu-dish-thumbnail]:[flex-basis:41px]! max-[700px]:[&>strong]:[font-size:10px]!",
  "menu-margin-value":     "[color:#187c3d]! [font-weight:670]!",
  "menu-empty":     "[padding:20px]! [color:#77716b]! [font-size:12px]!",
  "menu-management-count":     "[padding:7px_10px]! [border-radius:999px]! [background:#e8f5e9]! [color:#187c3d]! [font-size:10px]!" + " " +
    "[font-weight:650]!",
  "menu-availability":     "[display:inline-flex]! [width:fit-content]! [align-items:center]! [padding:5px_9px_5px_6px]! [gap:6px]!" + " " +
    "[border:1px_solid_#e7e4df]! [border-radius:999px]! [background:white]! [color:#67625c]! [font-size:10px]!" + " " +
    "[cursor:pointer]! [&>i]:[display:grid]! [&>i]:[width:16px]! [&>i]:[height:16px]! [&>i]:[place-items:center]!" + " " +
    "[&>i]:[border:1px_solid_#d7d3cd]! [&>div>i]:[border-radius:50%]! [&>i]:[background:#fff]! [&>i]:[font-style:normal]! [&.available]:[border-color:#d5ead8]!" + " " +
    "[&.available]:[background:#f3fbf3]! [&.available]:[color:#187c3d]! [&.available>i]:[border-color:#218944]! [&.available>i]:[background:#218944]! [&.available>i]:[color:white]!" + " " +
    "max-[700px]:[grid-column:2]! max-[700px]:[grid-row:1]! max-[700px]:[font-size:9px]!",
  "menu-view-icon":     "[display:grid]! [width:42px]! [height:42px]! [place-items:center]! [border-radius:13px]!" + " " +
    "[background:#fff0e3]! [color:#ed7718]!",
  "menu-suggestions-view":     "[min-height:510px]! [padding:19px]! [border:1px_solid_rgba(50,43,35,.06)]! [border-radius:20px]! [background:linear-gradient(145deg,#fff_13%,#fdfbf9_100%)]!" + " " +
    "[box-shadow:0_5px_17px_rgba(40,32,25,.045)]! max-[700px]:[min-height:0]! max-[700px]:[padding:13px]! max-[700px]:[border-radius:17px]!",
  "menu-suggestion-grid":     "[display:grid]! [grid-template-columns:repeat(3,minmax(0,1fr))]! [gap:13px]! max-[900px]:[grid-template-columns:1fr]!",
  "menu-suggestion-card":     "[display:flex]! [min-width:0]! [min-height:220px]! [align-items:flex-start]! [padding:17px]!" + " " +
    "[gap:13px]! [border:1px_solid_#ece9e4]! [border-radius:16px]! [background:#fff]! [box-shadow:0_3px_12px_rgba(40,32,25,.04)]!" + " " +
    "[&>div]:[min-width:0]! [&>div>h3]:[margin:7px_0_6px]! [&>div>h3]:[font-size:14px]! [&>div>h3]:[letter-spacing:-.025em]! [&>div>p]:[min-height:58px]!" + " " +
    "[&>div>p]:[margin:0_0_9px]! [&>div>p]:[color:#605b55]! [&>div>p]:[font-size:11px]! [&>div>p]:[line-height:1.5]! [&>div>.text-link]:[padding-left:0]!" + " " +
    "[&>div>.text-link]:[font-size:10px]! max-[900px]:[min-height:0]! max-[900px]:[&>div>p]:[min-height:0]! max-[700px]:[padding:13px]! max-[700px]:[gap:10px]!" + " " +
    "max-[700px]:[&>div>h3]:[font-size:12px]! max-[700px]:[&>div>p]:[font-size:10px]!",
  "menu-suggestion-label":     "[color:#9a6a47]! [font-size:9px]! [font-weight:680]! [letter-spacing:.04em]! [text-transform:uppercase]!",
  "menu-detail-dialog":     "[width:min(445px,_calc(100vw_-_28px))]! [&>.eyebrow]:[margin:16px_0_6px]! [&>[data-slot=dialog-title]]:[color:#211f1c]! [&>[data-slot=dialog-title]]:[font-size:22px]! [&>[data-slot=dialog-title]]:[font-weight:690]!" + " " +
    "[&>[data-slot=dialog-title]]:[letter-spacing:-.045em]! [&>[data-slot=dialog-title]]:[line-height:1.2]! [&>.dialog-copy]:[color:#69655f]! [&>.dialog-copy]:[line-height:1.55]! [&>.dialog-action]:[margin-top:3px]!",
  "menu-detail-thumbnail":     "[display:block]! [width:100%]! [height:150px]! [overflow:hidden]! [border-radius:15px]!" + " " +
    "[&>.menu-dish-thumbnail]:[width:100%]! [&>.menu-dish-thumbnail]:[height:100%]! [&>.menu-dish-thumbnail]:[border-radius:15px]! [&>.menu-dish-thumbnail]:[background-position:center_55%]!",
  "menu-detail-stats":     "[display:grid]! [grid-template-columns:repeat(3,1fr)]! [margin:6px_0]! [gap:9px]! [&>span]:[display:flex]!" + " " +
    "[&>span]:[flex-direction:column]! [&>span]:[padding:11px]! [&>span]:[gap:3px]! [&>span]:[border:1px_solid_#efede9]! [&>span]:[border-radius:11px]!" + " " +
    "[&>span]:[background:#fffdfa]! [&>span>strong]:[font-size:15px]! [&>span>small]:[color:#77716b]! [&>span>small]:[font-size:9px]! max-[430px]:[gap:5px]!" + " " +
    "max-[430px]:[&>span]:[padding:8px]!",
  "menu-dialog-sparkle":     "[display:grid]! [width:42px]! [height:42px]! [place-items:center]! [border-radius:13px]!" + " " +
    "[background:#fff0e3]! [color:#ed7718]!",
  "menu-management-heading":     "max-[700px]:[display:none]!",
};

export function menuClassName(className: string) {
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

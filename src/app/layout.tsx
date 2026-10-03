import type { Metadata } from "next";
import { FONT_CATALOG, fontVariables, STORAGE_KEY } from "./fonts";
import { DeckleDefs } from "@/components/paper/DeckleDefs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { TypeLab } from "@/components/typelab/TypeLab";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRAVAAH — Mega-Event Hospitality Orchestration",
  description:
    "PRAVAAH keeps a live Stay / Move / Eat / Gather capacity ledger, then issues atomic journey contracts so different people receive different feasible paths.",
};

// Serialised for the no-flash script below, which runs before React exists.
const VAR_MAP = Object.fromEntries(FONT_CATALOG.map((f) => [f.id, f.cssVar]));
const AXIS_MAP = Object.fromEntries(
  FONT_CATALOG.filter((f) => f.axes?.length).map((f) => [
    f.id,
    f.axes!.map((a) => a.tag),
  ]),
);

/**
 * Applies the stored type choices before first paint, so a reload never
 * flashes the default pairing. There is no theme branch: the site is
 * light paper only.
 */
const noFlash = `(function(){
try{
var M=${JSON.stringify(VAR_MAP)},A=${JSON.stringify(AXIS_MAP)};
var raw=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});if(!raw)return;
var s=JSON.parse(raw),r=document.documentElement;
var v=function(id){return M[id]?"var("+M[id]+")":null};
var deva=v(s.deva);
var stack=function(id){return [v(id),deva,"serif"].filter(Boolean).join(", ")};
var vset=function(id){var tags=A[id],vals=(s.axes||{})[id];if(!tags||!vals)return"normal";
var out=[];for(var i=0;i<tags.length;i++){var g=tags[i];if(vals[g]!==undefined)out.push('"'+g+'" '+vals[g]);}
return out.length?out.join(", "):"normal"};
if(s.display){r.style.setProperty("--type-display",stack(s.display));r.style.setProperty("--vset-display",vset(s.display));}
if(s.text){r.style.setProperty("--type-text",stack(s.text));r.style.setProperty("--vset-text",vset(s.text));}
if(deva){r.style.setProperty("--type-deva",deva+", serif");r.style.setProperty("--vset-deva",vset(s.deva));}
}catch(e){}
})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body className="flex min-h-full flex-col">
        <DeckleDefs />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <TypeLab />
      </body>
    </html>
  );
}

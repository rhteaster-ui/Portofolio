export const toolSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');
const monochrome=new Set(['ChatGPT','GitHub','Vercel','v0','Copilot','Google AI Studio','Railway']);
export default function ToolIcon({ name }: { name: string }) {
  return <img className={`brand-tool-icon tool-${toolSlug(name)} ${monochrome.has(name)?'tool-monochrome':''} ${name==='Codex'?'tool-reverse':''}`} src={`/images/tools/${toolSlug(name)}.svg`} alt="" width="28" height="28" loading="lazy"/>;
}

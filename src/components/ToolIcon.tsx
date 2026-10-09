export const toolSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');
export default function ToolIcon({ name }: { name: string }) {
  return <img className="brand-tool-icon" src={`/images/tools/${toolSlug(name)}.svg`} alt="" width="28" height="28" loading="lazy"/>;
}

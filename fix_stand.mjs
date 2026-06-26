import fs from 'fs';

let c = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

if (!c.includes("import LiveAudioRoom from")) {
  c = c.replace(/import \{ BackButton \} from "@\/components\/ui\/BackButton";/, `import { BackButton } from "@/components/ui/BackButton";
import LiveAudioRoom from "@/components/stands/LiveAudioRoom";`);
}

// Add params to the component
c = c.replace(/export default function ActiveStandPage\(\) \{/, `export default function ActiveStandPage({ params }: { params: { id: string } }) {`);

// Wrap the main return div
// The return statement looks like:
// return (
//   <div className="flex flex-col h-screen bg-background relative overflow-hidden">
const returnRegex = /return \(\s*<div className="flex flex-col h-screen bg-background relative overflow-hidden">/;

c = c.replace(returnRegex, `return (
    <LiveAudioRoom roomName={params.id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
      <div className="flex flex-col h-screen bg-background relative overflow-hidden">`);

// Close the wrapper at the very end
// We know the file ends with a closing div and then the function bracket.
c = c.replace(/    <\/div>\n  \);\n\}\n?$/, `    </div>
    </LiveAudioRoom>
  );
}`);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', c);

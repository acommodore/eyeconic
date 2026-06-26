import fs from 'fs';

let c = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

if (!c.includes("import LiveAudioRoom from")) {
  c = c.replace(/import \{ BackButton \} from "@\/components\/ui\/BackButton";/, `import { BackButton } from "@/components/ui/BackButton";
import LiveAudioRoom from "@/components/stands/LiveAudioRoom";`);
}

// Add params to the component
c = c.replace(/export default function ActiveStandPage\(\) \{/, `export default function ActiveStandPage({ params }: { params: { id: string } }) {`);

// Wrap the main return div safely
const returnRegex = /return \(\s*<div className="flex-1 w-full md:max-w-\[1600px\] md:mx-auto text-foreground flex flex-col xl:flex-row bg-background overflow-hidden">/;
c = c.replace(returnRegex, () => `return (
    <LiveAudioRoom roomName={params.id} username={\`User_\${Math.floor(Math.random() * 1000)}\`}>
    <div className="flex-1 w-full md:max-w-[1600px] md:mx-auto text-foreground flex flex-col xl:flex-row bg-background overflow-hidden">`);

// Close the wrapper at the very end
c = c.replace(/    <\/div>\n  \);\n\}\n?$/, () => `    </div>
    </LiveAudioRoom>
  );
}`);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', c);

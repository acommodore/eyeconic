const fs = require('fs');
let c = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');
c = c.replace('export default function LoginPage() {', 'function LoginForm() {');
c += '\nexport default function LoginPage() { return <Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>; }\n';
c = c.replace('import { useSearchParams } from "next/navigation";', 'import { useSearchParams } from "next/navigation";\nimport { Suspense } from "react";');
fs.writeFileSync('src/app/(auth)/login/page.tsx', c);

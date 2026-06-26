const fs = require('fs');

// 1. Change redirect to /onboarding in actions.ts
let actions = fs.readFileSync('src/app/(auth)/actions.ts', 'utf8');
actions = actions.replace(/redirect\('\/discover'\)/g, "redirect('/onboarding')");
fs.writeFileSync('src/app/(auth)/actions.ts', actions);

// 2. Add error message display to login page
let login = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');

if (!login.includes('searchParams')) {
  login = login.replace('import { login } from "@/app/(auth)/actions";', 'import { login } from "@/app/(auth)/actions";\nimport { useSearchParams } from "next/navigation";');
  
  login = login.replace('export default function LoginPage() {', 'export default function LoginPage() {\n  const searchParams = useSearchParams();\n  const message = searchParams.get("message");');

  // Insert error message banner above the form
  login = login.replace('<form className="w-full space-y-5"', '{message && (<div className="w-full p-4 mb-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center rounded-xl">{message}</div>)}\n      <form className="w-full space-y-5"');

  fs.writeFileSync('src/app/(auth)/login/page.tsx', login);
}

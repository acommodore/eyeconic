const fs = require('fs');

let c = fs.readFileSync('src/app/(auth)/login/page.tsx', 'utf8');

c = c.replace('import { useState } from "react";', `import { useState } from "react";\nimport { login } from "@/app/(auth)/actions";`);

c = c.replace(/const handleLogin = \(e: React\.FormEvent\) => \{\s*e\.preventDefault\(\);\s*router\.push\("\/dashboard"\);\s*\};/g, '');

c = c.replace(/<form className="w-full space-y-5" onSubmit=\{handleLogin\}>/g, '<form className="w-full space-y-5" action={login}>');

c = c.replace(/type="email"/, 'type="email" name="email"');
c = c.replace(/type=\{showPassword \? "text" : "password"\}/, 'type={showPassword ? "text" : "password"} name="password"');

fs.writeFileSync('src/app/(auth)/login/page.tsx', c);

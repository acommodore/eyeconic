const fs = require('fs');
let c = fs.readFileSync('src/app/(auth)/signup/page.tsx', 'utf8');
c = c.replace('import { useState } from "react";', 'import { useState } from "react";\nimport { signup } from "@/app/(auth)/actions";');
c = c.replace(/const handleSignup = \(e: React\.FormEvent\) => \{[\s\S]*?\};/g, '');
c = c.replace(/<form className="w-full space-y-5" onSubmit=\{handleSignup\}>/g, '<form className="w-full space-y-5" action={signup}>');
c = c.replace(/type="email"/, 'type="email" name="email"');
c = c.replace(/type=\{showPassword \? "text" : "password"\}/, 'type={showPassword ? "text" : "password"} name="password"');
c = c.replace(/type="text"\s+placeholder="Enter your username"/, 'type="text" placeholder="Enter your username" name="username"');
fs.writeFileSync('src/app/(auth)/signup/page.tsx', c);

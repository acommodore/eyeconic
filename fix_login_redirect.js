const fs = require('fs');

let actions = fs.readFileSync('src/app/(auth)/actions.ts', 'utf8');

// I need to change only the login redirect back to /discover
// The code has two redirect('/onboarding') now (one in login, one in signup)

const loginStart = actions.indexOf('export async function login(');
const signupStart = actions.indexOf('export async function signup(');

let loginPart = actions.substring(loginStart, signupStart);
let signupPart = actions.substring(signupStart);

// Change onboarding to discover in loginPart
loginPart = loginPart.replace(/redirect\('\/onboarding'\)/, "redirect('/discover')");

fs.writeFileSync('src/app/(auth)/actions.ts', actions.substring(0, loginStart) + loginPart + signupPart);

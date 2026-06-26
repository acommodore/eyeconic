const fs = require('fs');

let stands = fs.readFileSync('src/app/(app)/stands/[id]/page.tsx', 'utf8');

stands = stands.replace(
  /const \[chatMessages, setChatMessages\] = useState\(\[\s*\{[\s\S]*?isSpeaker: false\s*\}\s*\]\);/,
  `const [chatMessages, setChatMessages] = useState([
    ...Array(15).fill(0).flatMap((_, i) => [
      {
        id: i * 2 + 1,
        name: "Gooner4Life",
        color: "text-[teal]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
        time: "1m ago",
        text: "Absolute shocker from the VAR there. Clear penalty! We are being robbed in broad daylight.",
        isSpeaker: false
      },
      {
        id: i * 2 + 2,
        name: "BlueMason",
        color: "text-[coral]",
        avatar: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        time: "Just now",
        text: "Never a pen. He dove before the contact even happened. 🤡 Have some shame!",
        isSpeaker: false
      }
    ])
  ]);`
);

fs.writeFileSync('src/app/(app)/stands/[id]/page.tsx', stands);

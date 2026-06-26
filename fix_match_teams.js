const fs = require('fs');
const filePath = 'src/app/(app)/match/[id]/page.tsx';
let file = fs.readFileSync(filePath, 'utf8');

// Replace specific logos
file = file.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/e\/eb\/Manchester_City_FC_badge\.svg"/g, '{matchInfo?.logo2 || "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg"}');
file = file.replace(/"https:\/\/upload\.wikimedia\.org\/wikipedia\/en\/0\/0c\/Liverpool_FC\.svg"/g, '{matchInfo?.logo1 || "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg"}');

// Replace Team 1 and Team 2 texts
file = file.replace(/>Man City</g, '>{matchInfo?.team2 || "Man City"}<');
file = file.replace(/>Liverpool</g, '>{matchInfo?.team1 || "Liverpool"}<');
file = file.replace(/>MAN CITY</g, '>{matchInfo?.team2?.toUpperCase() || "MAN CITY"}<');
file = file.replace(/>LIVERPOOL</g, '>{matchInfo?.team1?.toUpperCase() || "LIVERPOOL"}<');
file = file.replace(/>LIVERPOOL FANS</g, '>{(matchInfo?.team1?.toUpperCase() || "LIVERPOOL") + " FANS"}<');

// Replace "Team 1" fallback with "Home" and "Team 2" fallback with "Away" just in case
file = file.replace(/\|\| "Team 1"/g, '|| "Home"');
file = file.replace(/\|\| "Team 2"/g, '|| "Away"');

fs.writeFileSync(filePath, file);

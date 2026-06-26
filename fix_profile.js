const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/profile/page.tsx', 'utf8');

c = c.replace('import { useState } from "react";', 'import { useState, useEffect } from "react";\nimport { createClient } from "@/lib/supabase/client";');

const oldComponentStart = `export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("track-record");`;

const newComponentStart = `export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("track-record");
  const [profile, setProfile] = useState<any>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (prof) {
          setProfile(prof);
        }
      }
    };
    fetchUser();
  }, [supabase]);
`;

c = c.replace(oldComponentStart, newComponentStart);

const oldAvatarHTML = `<img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maximus" alt="Avatar" className="w-full h-full object-cover" />`;
const newAvatarHTML = `<img src={profile?.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + userEmail} alt="Avatar" className="w-full h-full object-cover" />`;

c = c.replace(oldAvatarHTML, newAvatarHTML);

const oldNameHTML = `<div>
                <h2 className="text-2xl font-black tracking-widest uppercase">Maximus Prime</h2>
                <p className="text-muted-foreground text-sm font-mono mt-1">@maxprime_99</p>
              </div>`;
const newNameHTML = `<div>
                <h2 className="text-2xl font-black tracking-widest uppercase">{profile?.username || "Operative"}</h2>
                <p className="text-muted-foreground text-sm font-mono mt-1">{userEmail ? \`@\${userEmail.split('@')[0]}\` : '@operative_99'}</p>
              </div>`;

c = c.replace(oldNameHTML, newNameHTML);

fs.writeFileSync('src/app/(app)/profile/page.tsx', c);

const fs = require('fs');

let c = fs.readFileSync('src/app/(app)/profile/page.tsx', 'utf8');

if (!c.includes('isEditModalOpen')) {
  // 1. Add states
  c = c.replace(
    'const [userEmail, setUserEmail] = useState<string>("");',
    'const [userEmail, setUserEmail] = useState<string>("");\n  const [isEditModalOpen, setIsEditModalOpen] = useState(false);\n  const [editUsername, setEditUsername] = useState("");\n  const [isSaving, setIsSaving] = useState(false);'
  );

  // 2. Add handleSave function
  const handleSaveCode = `
  const handleSaveProfile = async () => {
    if (!editUsername.trim() || !profile) return;
    setIsSaving(true);
    const { error } = await supabase.from('profiles').update({ username: editUsername.trim() }).eq('id', profile.id);
    if (!error) {
      setProfile({ ...profile, username: editUsername.trim() });
      setIsEditModalOpen(false);
    }
    setIsSaving(false);
  };
`;
  c = c.replace('useEffect(() => {', handleSaveCode + '\n  useEffect(() => {');

  // 3. Make the Edit button open the modal
  c = c.replace(
    '<button className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform z-20">',
    `<button onClick={() => { setEditUsername(profile?.username || ""); setIsEditModalOpen(true); }} className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full hover:scale-110 transition-transform z-20">`
  );

  // 4. Inject the Modal at the end of the return statement
  const modalHTML = `
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0A0A0A] border border-border rounded-3xl p-6 w-full max-w-sm space-y-6 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-widest text-foreground">Edit Profile</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Username</label>
              <input 
                type="text" 
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Enter new username"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-foreground focus:outline-none focus:border-teal transition-colors"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 py-3 rounded-xl border border-border text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex-1 py-3 rounded-xl bg-teal text-black text-xs font-black uppercase tracking-widest hover:bg-teal/90 transition-colors flex justify-center items-center"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

  c = c.replace(/    <\/div>\s*\);\s*\}\s*$/, modalHTML);

  fs.writeFileSync('src/app/(app)/profile/page.tsx', c);
}

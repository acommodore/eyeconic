"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export function GlobalMatchListener() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const topMatchIdRef = useRef<string | null>(null);
  const isQueryingRef = useRef<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initial fetch to get the current highest volatility live match
    const fetchTopMatch = async () => {
      const { data } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'live')
        .order('volatility', { ascending: false })
        .limit(1)
        .single();
      
      if (data) {
        topMatchIdRef.current = data.id;
      }
    };
    fetchTopMatch();

    const triggerCheck = async () => {
      if (isQueryingRef.current) return;
      isQueryingRef.current = true;
      
      try {
        const { data: newTop } = await supabase
          .from('matches')
          .select('id, team1, team2, volatility')
          .eq('status', 'live')
          .order('volatility', { ascending: false })
          .limit(1)
          .single();

        if (newTop && topMatchIdRef.current && newTop.id !== topMatchIdRef.current) {
          topMatchIdRef.current = newTop.id;
          
          if (!pathname.includes(`/match/${newTop.id}`)) {
            toast('🔥 Match of the Moment has changed!', {
              description: `Volatility is spiking in ${newTop.team1} vs ${newTop.team2}.`,
              action: {
                label: 'Watch Now',
                onClick: () => router.push(`/match/${newTop.id}`),
              },
              duration: 10000,
            });
          }
        }
      } finally {
        isQueryingRef.current = false;
      }
    };

    // Subscribe to all matches updates
    const channel = supabase.channel('global_match_tracker')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'matches' }, () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          triggerCheck();
        }, 3000); // debounce 3 seconds
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [supabase, router, pathname]);

  return null;
}

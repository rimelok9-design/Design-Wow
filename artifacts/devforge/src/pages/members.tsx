import { Layout } from "@/components/layout/Layout";
import { mockMembers } from "@/data/members";
import { MemberCard } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Members() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [level, setLevel] = useState("all");

  const cities = Array.from(new Set(mockMembers.map(m => m.city))).sort();

  const filteredMembers = useMemo(() => {
    return mockMembers.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                            m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCity = city === "all" || m.city === city;
      const matchesLevel = level === "all" || m.level === level;
      
      return matchesSearch && matchesCity && matchesLevel;
    });
  }, [search, city, level]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold font-mono tracking-tight mb-2 text-foreground">
            USER_DIRECTORY
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Connect with the brightest minds across the continent. Find collaborators, mentors, and friends.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 bg-card p-4 rounded-xl border border-border">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or skill..." 
              className="pl-10 font-mono bg-background border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-members"
            />
          </div>
          
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="font-mono bg-background">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="font-mono bg-background">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Mid">Mid-Level</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl bg-card/30">
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold font-mono mb-2">NO_OPERATIVES_FOUND</h3>
            <p className="text-muted-foreground">Adjust your search parameters to try again.</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <MemberCard key={member.id} member={member} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

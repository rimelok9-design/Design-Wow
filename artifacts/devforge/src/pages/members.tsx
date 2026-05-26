import { Layout } from "@/components/layout/Layout";
import { mockMembers } from "@/data/members";
import { MemberCard } from "@/components/MemberCard";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";

export default function Members() {
  const { t } = useApp();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [level, setLevel] = useState("all");

  const cities = Array.from(new Set(mockMembers.map(m => m.city))).sort();

  const filteredMembers = useMemo(() => {
    return mockMembers.filter(m => {
      const matchesSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCity = city === "all" || m.city === city;
      const matchesLevel = level === "all" || m.level === level;
      return matchesSearch && matchesCity && matchesLevel;
    });
  }, [search, city, level]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">{t("members.label")}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2 mb-3">{t("members.title")}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">{t("members.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-10 bg-card p-4 rounded-2xl border border-border">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("members.search")}
              className="pl-10 bg-background border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="input-search-members"
            />
          </div>

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder={t("members.allCities")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("members.allCities")}</SelectItem>
              {cities.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder={t("members.allLevels")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("members.allLevels")}</SelectItem>
              <SelectItem value="Junior">{t("members.junior")}</SelectItem>
              <SelectItem value="Mid">{t("members.mid")}</SelectItem>
              <SelectItem value="Senior">{t("members.senior")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredMembers.length}</span> {t("members.found")}
          </p>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-card/30">
            <Users className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
            <h3 className="text-xl font-bold mb-2">{t("members.empty")}</h3>
            <p className="text-muted-foreground">{t("members.emptyDesc")}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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

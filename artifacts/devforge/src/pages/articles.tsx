import { Layout } from "@/components/layout/Layout";
import { mockArticles } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export default function Articles() {
  const { t } = useApp();
  const [category, setCategory] = useState("All");

  const categories = [
    { key: "All", label: t("articles.all") },
    { key: "Blog", label: t("articles.blog") },
    { key: "Tutorial", label: t("articles.tutorial") },
    { key: "News", label: t("articles.news") },
  ];

  const filteredArticles = useMemo(() => {
    if (category === "All") return mockArticles;
    return mockArticles.filter(a => a.category === category);
  }, [category]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-6">
            <FileText className="h-4 w-4" /> {t("articles.label")}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{t("articles.title")}</h1>
          <p className="text-muted-foreground text-lg">{t("articles.subtitle")}</p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setCategory(cat.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  category === cat.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl bg-card/30">
            <FileText className="h-14 w-14 text-muted-foreground mx-auto mb-4 opacity-40" />
            <p className="text-muted-foreground">{t("articles.empty")}</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}

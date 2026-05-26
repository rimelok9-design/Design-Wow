import { Layout } from "@/components/layout/Layout";
import { mockArticles } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

export default function Articles() {
  const [category, setCategory] = useState<string>("All");

  const categories = ["All", "Blog", "Tutorial", "News"];

  const filteredArticles = useMemo(() => {
    if (category === "All") return mockArticles;
    return mockArticles.filter(a => a.category === category);
  }, [category]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-mono mb-4">
            <FileText className="h-4 w-4" /> KNOWLEDGE_BASE
          </div>
          <h1 className="text-4xl font-bold font-mono tracking-tight mb-4 text-foreground">
            Transmission Logs
          </h1>
          <p className="text-muted-foreground text-lg">
            Tutorials, community news, and thought leadership from builders across the continent.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <Tabs defaultValue="All" value={category} onValueChange={setCategory} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat} className="font-mono text-xs md:text-sm data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20 text-muted-foreground font-mono">
            NO_LOGS_FOUND
          </div>
        )}
      </div>
    </Layout>
  );
}

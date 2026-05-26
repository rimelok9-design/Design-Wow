import { Article } from "@/data/articles";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index: number;
}

const categoryConfig: Record<string, { label: string; cls: string }> = {
  Tutorial: { label: "Tutoriel", cls: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  News: { label: "Actualité", cls: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  Blog: { label: "Blog", cls: "bg-primary/10 text-primary border-primary/20" },
};

export function ArticleCard({ article, index }: ArticleCardProps) {
  const cat = categoryConfig[article.category] ?? { label: article.category, cls: "bg-muted/40 text-muted-foreground border-border" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="h-full"
    >
      <Link href={`/articles/${article.id}`} data-testid={`card-article-${article.id}`}>
        <div className="h-full flex flex-col bg-card border border-border rounded-2xl overflow-hidden card-hover group cursor-pointer">
          {/* Image */}
          <div className="relative h-44 overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.cls}`}>
                {cat.label}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-5">
            <h3 className="font-bold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-2">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow mb-4">
              {article.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[11px] text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-md font-mono">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2.5">
                <Avatar className="h-7 w-7 border border-border">
                  <AvatarImage src={article.authorAvatar} />
                  <AvatarFallback className="text-xs">{article.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium leading-none">{article.author}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {new Date(article.publishedAt).toLocaleDateString("fr-FR", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                <Clock className="h-3 w-3" /> {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

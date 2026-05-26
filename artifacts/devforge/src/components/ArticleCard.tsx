import { Article } from "@/data/articles";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index: number;
}

export function ArticleCard({ article, index }: ArticleCardProps) {
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Tutorial': return 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30';
      case 'News': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'Blog': return 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/articles/${article.id}`}>
        <Card className="h-full flex flex-col bg-card hover:border-primary/50 transition-colors overflow-hidden group cursor-pointer">
          <div className="relative h-48 overflow-hidden bg-muted">
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge variant="outline" className={`font-mono backdrop-blur ${getCategoryColor(article.category)}`}>
                {article.category}
              </Badge>
            </div>
          </div>
          
          <CardHeader className="p-4 pb-2">
            <h3 className="font-bold text-xl font-sans leading-tight line-clamp-2 group-hover:text-primary transition-colors">{article.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{article.excerpt}</p>
          </CardHeader>
          
          <CardContent className="p-4 py-2 flex-grow">
            <div className="flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-4 border-t border-border/50 flex justify-between items-center bg-muted/10">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border border-border">
                <AvatarImage src={article.authorAvatar} />
                <AvatarFallback className="text-xs font-mono">{article.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{article.author}</span>
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3" /> {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime}
            </span>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

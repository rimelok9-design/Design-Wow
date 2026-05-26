import { Layout } from "@/components/layout/Layout";
import { mockArticles } from "@/data/articles";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticleDetail() {
  const params = useParams<{ id: string }>();
  const article = mockArticles.find(a => a.id === params.id);

  if (!article) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-mono font-bold mb-4">404_LOG_NOT_FOUND</h1>
          <Link href="/articles">
            <Button variant="outline" className="font-mono mt-4">Return to Knowledge Base</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link href="/articles" className="inline-flex items-center text-primary hover:text-primary/80 font-mono mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> BACK_TO_LOGS
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="mb-10 text-center">
            <div className="mb-6">
              <span className="text-primary font-mono text-sm uppercase tracking-widest border border-primary/30 bg-primary/10 px-3 py-1 rounded-full">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground font-mono">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.authorAvatar} />
                  <AvatarFallback>{article.author.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="text-foreground">{article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </div>
            </div>
          </header>

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-12 border border-border">
            <img 
              src={article.imageUrl} 
              alt="Article cover" 
              className="object-cover w-full h-full"
            />
          </div>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-sans prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
            <p className="lead">This is a mock full article content for demonstration purposes. In a real application, this would contain the rich text or markdown content of the article.</p>
            
            <h2>The Challenge We Faced</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            
            <blockquote>
              <p>The most important thing about building for the next billion users is remembering they don't have the same hardware or network conditions as the first billion.</p>
            </blockquote>
            
            <h3>Technical Implementation</h3>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <pre><code>{`// A quick example
function optimizeForSlowNetworks(data) {
  // Compression logic here
  const compressed = compressPayload(data);
  return sendOverWire(compressed, { timeout: 30000 });
}`}</code></pre>

            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          </div>

          <footer className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-muted rounded-full text-sm font-mono text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
            
            <Button variant="outline" className="font-mono">
              <Share2 className="mr-2 h-4 w-4" /> Share Article
            </Button>
          </footer>
        </motion.article>
      </div>
    </Layout>
  );
}

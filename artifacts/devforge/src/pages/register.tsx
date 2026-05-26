import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, User, Mail, Lock, CheckCircle2 } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function Register() {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { t } = useApp();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    login({
      id: "u1",
      name: values.name,
      email: values.email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(values.name)}`,
    });
    setLocation("/dashboard");
  }

  const benefits = [
    t("register.perk1"),
    t("register.perk2"),
    t("register.perk3"),
    t("register.perk4"),
  ];

  return (
    <Layout>
      <div className="min-h-[90vh] flex">
        {/* Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            <div className="lg:hidden flex items-center gap-2.5 mb-10">
              <svg viewBox="0 0 36 24" width="36" height="24" className="rounded-sm overflow-hidden flex-shrink-0" aria-hidden="true">
                <rect x="0" y="0" width="12" height="24" fill="#008751" />
                <rect x="12" y="0" width="24" height="12" fill="#FCD116" />
                <rect x="12" y="12" width="24" height="12" fill="#E8112D" />
              </svg>
              <span className="font-bold text-xl tracking-tight">Dev<span className="text-primary">Benin</span></span>
            </div>

            <h1 className="text-3xl font-bold mb-2">{t("register.title")}</h1>
            <p className="text-muted-foreground mb-10">{t("register.subtitle")}</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.name")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={t("register.namePlaceholder")} className="pl-10 h-11 bg-card border-border" data-testid="input-name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.email")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder={t("register.emailPlaceholder")} className="pl-10 h-11 bg-card border-border" data-testid="input-email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.password")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder={t("register.passwordPlaceholder")} className="pl-10 h-11 bg-card border-border" data-testid="input-password" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.confirm")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder={t("register.confirmPlaceholder")} className="pl-10 h-11 bg-card border-border" data-testid="input-confirm-password" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <Button type="submit" size="lg" className="w-full h-11 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-primary mt-2" data-testid="button-submit-register">
                  {t("register.submit")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>

            <p className="text-sm text-muted-foreground mt-8 text-center">
              {t("register.hasAccount")}{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                {t("register.login")}
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Side panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-card border-l border-border items-center justify-center p-16 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10 max-w-sm">
            <div className="flex items-center gap-3 mb-12">
              <svg viewBox="0 0 36 24" width="42" height="28" className="rounded-sm overflow-hidden flex-shrink-0" aria-hidden="true">
                <rect x="0" y="0" width="12" height="24" fill="#008751" />
                <rect x="12" y="0" width="24" height="12" fill="#FCD116" />
                <rect x="12" y="12" width="24" height="12" fill="#E8112D" />
              </svg>
              <span className="font-bold text-2xl tracking-tight">Dev<span className="text-primary">Benin</span></span>
            </div>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {t("register.brandTitle")}
              <br />
              <span className="gradient-text">{t("register.brandAccent")}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              {t("register.subtitle")}
            </p>
            <div className="space-y-4">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

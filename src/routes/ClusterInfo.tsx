import { motion } from "framer-motion";
import { ExternalLink, Settings, Activity, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MotionCard = motion(Card);

export default function ClustersInfoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-primary rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-primary-dark/5 to-primary-light/10 rounded-full filter blur-[120px] animate-spin-slow"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        <motion.div
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-lighter via-primary-light to-primary-accent"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Cluster Info
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MotionCard 
              className="bg-background/30 backdrop-blur-xl border-2 border-primary/20 shadow-xl"
              whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <ExternalLink className="w-6 h-6 text-primary-lighter" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Activity className="w-5 h-5 text-primary-lighter" />
                  <span className="text-foreground group-hover:text-primary-lighter">API Dashboard</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary-lighter" />
                </motion.a>
                <motion.a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Database className="w-5 h-5 text-primary-lighter" />
                  <span className="text-foreground group-hover:text-primary-lighter">Grafana Metrics</span>
                  <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary-lighter" />
                </motion.a>
              </CardContent>
            </MotionCard>

            <MotionCard 
              className="bg-background/30 backdrop-blur-xl border border-border shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary-lighter" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                Basic Info Content
              </CardContent>
            </MotionCard>
          </motion.div>

          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MotionCard 
              className="h-full bg-background/30 backdrop-blur-xl border border-border shadow-lg"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Activity className="w-6 h-6 text-primary-lighter" />
                  Advanced Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                Adavnced Information Content
              </CardContent>
            </MotionCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
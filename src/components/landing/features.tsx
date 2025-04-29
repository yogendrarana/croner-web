import {
  Clock,
  Bell,
  BarChart3,
  Shield,
  Zap,
  History,
  Server,
  Terminal,
} from "lucide-react";

const features = [
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Precise Scheduling",
    description:
      "Schedule jobs with cron syntax or use our intuitive interface to set up complex recurring schedules.",
  },
  {
    icon: <Bell className="h-6 w-6 text-primary" />,
    title: "Reliable Notifications",
    description:
      "Get notified via email, SMS, or webhooks when jobs succeed or fail, so you're always in the loop.",
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    title: "Detailed Analytics",
    description:
      "Track execution history, performance metrics, and resource usage with beautiful, interactive charts.",
  },
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Secure by Design",
    description:
      "All requests are encrypted and authenticated with robust security protocols and best practices.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Blazing Fast",
    description:
      "Built on a distributed architecture that ensures your cron jobs run on time, every time.",
  },
  {
    icon: <History className="h-6 w-6 text-primary" />,
    title: "Execution History",
    description:
      "Keep track of all job executions with detailed logs and status reports for easy troubleshooting.",
  },
  {
    icon: <Server className="h-6 w-6 text-primary" />,
    title: "Scalable Infrastructure",
    description:
      "From hobby projects to enterprise workloads, our platform scales with your needs without hassle.",
  },
  {
    icon: <Terminal className="h-6 w-6 text-primary" />,
    title: "API Access",
    description:
      "Integrate with our RESTful API to programmatically manage your cron jobs from your applications.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="mb-10 text-xl text-center mx-auto text-muted-foreground">
        Everything you need to automate your recurring tasks with reliability
        and precision.
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-background rounded-lg p-6 border shadow-sm transition-all"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

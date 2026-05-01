export const interpretMetrics = (metrics) => {
  // Removed deploymentFreq to resolve ESLint unused variable error
  const { leadTime, prThroughput, bugRate, cycleTime } = metrics;

  // 1. Logic for Ava Chen (The primary MVP journey)
  if (cycleTime > leadTime) {
    return {
      story: `You have a perfect 0% bug rate, but your Cycle Time (${cycleTime}d) is higher than your Lead Time (${leadTime}d).`,
      action: "This indicates work is staying 'In Progress' too long. Try breaking your Jira tickets into smaller sub-tasks to improve flow."
    };
  }
  
  // 2. Logic for Bottlenecks in Review/Deploy
  if (leadTime > 4 && prThroughput > 10) {
    return {
      story: "You are producing a lot of code, but it's getting stuck in the review or deployment phase.",
      action: "Identify which PRs have been open for more than 48 hours and request a priority review."
    };
  }

  // 3. Logic for Quality Issues
  if (bugRate > 0.1) {
    return {
      story: "Your delivery speed is consistent, but escaped bugs are starting to trend upward.",
      action: "Slow down on new feature PRs this week and prioritize writing unit tests for your active Jira issues."
    };
  }

  // 4. Baseline/Healthy state
  return {
    story: "Your workflow metrics look balanced and healthy.",
    action: "Maintain this pace and consider reviewing a peer's PR to help the team's overall lead time."
  };
};
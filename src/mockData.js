export const mockData = {
  developer: "Ava Chen",
  metrics: {
    leadTime: 2.88,        // Average days from PR to Prod[cite: 3]
    cycleTime: 3.92,       // Average days from In-Progress to Done[cite: 3]
    prThroughput: 4,       // Total merged PRs[cite: 3]
    deploymentFreq: 4,     // Successful production deployments[cite: 3]
    bugRate: 0.0           // Bugs escaped to production[cite: 3]
  },
  insights: {
    story: "Your workflow is exceptionally clean with a 0% bug rate, though your cycle time is slightly higher than your lead time.",
    action: "Focus on breaking down larger Jira issues into smaller tasks to reduce your cycle time while maintaining this high quality."
  }
};
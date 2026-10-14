export const processes = {
  websites: [
    { label: "DISCOVER", title: "Understand your audience", detail: "Identify who the website is for and what visitors need to do." },
    { label: "PLAN", title: "Plan pages and content", detail: "Agree the page structure, key messages and visitor journeys." },
    { label: "DESIGN", title: "Design the experience", detail: "Review layouts, branding and how the site works on different screens." },
    { label: "BUILD", title: "Develop the website", detail: "Turn the agreed design into working pages, forms and integrations." },
    { label: "TEST", title: "Check the details", detail: "Test accessibility, responsiveness, speed and the important interactions." },
    { label: "LAUNCH", title: "Launch and hand over", detail: "Publish the site and explain how your team can use and maintain it." },
  ],
  business: [
    { label: "MAP", title: "Map your workflow", detail: "Find where work slows down, repeats or depends on manual copying." },
    { label: "SIMPLIFY", title: "Simplify the steps", detail: "Remove unnecessary work and agree a clearer process with your team." },
    { label: "CONNECT", title: "Connect your tools", detail: "Plan how information moves between the business systems you already use." },
    { label: "AUTOMATE", title: "Automate routine work", detail: "Build the agreed rules, notifications and repeatable actions." },
    { label: "VALIDATE", title: "Validate real scenarios", detail: "Check normal cases, exceptions and permissions before relying on the workflow." },
    { label: "HANDOVER", title: "Train and hand over", detail: "Document the workflow and help your team run it with confidence." },
  ],
  creative: [
    { label: "BRIEF", title: "Define the message", detail: "Agree your audience, purpose, channels and the message to communicate." },
    { label: "RESEARCH", title: "Research your audience", detail: "Review the audience, brand voice and content already available." },
    { label: "CONCEPT", title: "Choose a creative direction", detail: "Shape a clear story and select the ideas that fit your brand." },
    { label: "CREATE", title: "Create the content", detail: "Write the copy and produce the agreed creative assets." },
    { label: "REFINE", title: "Review and refine", detail: "Check clarity, consistency and accuracy, then incorporate your feedback." },
    { label: "PUBLISH", title: "Prepare for publishing", detail: "Deliver the approved assets in the formats needed for your chosen channels." },
  ],
  ai: [
    { label: "SCOPE", title: "Choose a useful task", detail: "Define the task, expected benefit and where a person must stay in control." },
    { label: "ASSESS", title: "Assess suitability and risk", detail: "Review privacy, accuracy, data access and whether AI fits the task." },
    { label: "PREPARE", title: "Prepare the inputs", detail: "Organise approved information and define the instructions and safeguards." },
    { label: "BUILD", title: "Build the AI workflow", detail: "Create the agreed prompts, connections and review points." },
    { label: "EVALUATE", title: "Evaluate the results", detail: "Test realistic examples, failure cases and the quality of human review." },
    { label: "DEPLOY", title: "Deploy and monitor", detail: "Introduce the workflow with clear usage guidance and monitoring requirements." },
  ],
} as const;
